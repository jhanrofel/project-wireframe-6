import {repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ShareTo, Users} from '../models';
import {
  UsersRepository,
  ShareToRepository,
  UploadsRepository,
} from '../repositories';
import {genSalt, hash, compare} from 'bcryptjs';
import {inject} from '@loopback/core';
import {
  TokenServiceBindings,
  MyUserService,
  UserServiceBindings,
  UserRepository,
} from '@loopback/authentication-jwt';
import {TokenService} from '@loopback/authentication';
import {SecurityBindings, UserProfile} from '@loopback/security';
import _ from 'lodash';
import {authenticate} from '@loopback/authentication';

interface apiResponse {
  status: number;
  message?: string;
  users?: Users[]|void[];
  error?: string;
}

@authenticate('jwt')
export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @repository(UploadsRepository)
    public uploadsRepository: UploadsRepository,
    @repository(ShareToRepository)
    public shareToRepository: ShareToRepository,

    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @authenticate.skip()
  @post('/users')
  @response(200, {
    description: 'Users model instance',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',
            exclude: ['id'],
          }),
        },
      },
    })
    users: Omit<Users, '_id'>,
  ): Promise<apiResponse> {
    const password = await hash(users.password, await genSalt());
    users.password = password;
    const response = this.usersRepository
      .create(users)
      .then(res => {
        this.usersRepository.userCredentials(res.id).create({password});
        res.password = '';
        return {status: 200, users: [res]};
      })
      .catch(err => {
        if (err.code === 11000) {
          return {
            status: 500,
            error: `${err.keyValue.email} email already exist.`,
          };
        } else {
          return {status: 500, error: err.message};
        }
      });

    return response;
  }

  @get('/users')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Users, {exclude: ['password']}),
        },
      },
    },
  })
  async find(): Promise<apiResponse> {
    const users:Users[] = await this.usersRepository.find({fields: {password: false}});
    return {status: 200, users: users};
  }

  @get('/users/{id}')
  @response(200, {
    description: 'Users model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Users, {exclude: ['password']}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Users> {
    return this.usersRepository.findById(id, {fields: {password: false}});
  }

  @patch('/users/{id}')
  @response(204, {description: 'Users PATCH success'})
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {exclude: ['id', 'password']}),
        },
      },
    })
    users: Omit<Users, '_id,password'>,
  ): Promise<apiResponse> {
    const response = this.usersRepository
      .updateById(id, users)
      .then((res) => {
        return {status: 200, users: [res]};
      })
      .catch(err => {
        if (err.code === 11000) {
          return {
            status: 500,
            error: `${err.keyValue.email} email already exist.`,
          };
        } else {
          return {status: 500, error: err.message};
        }
      });

    return response;
  }

  @del('/users/{id}')
  @response(204, {
    description: 'Users DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.shareToRepository.deleteAll({user: id});
    await this.usersRepository.userChats(id).delete();
    await this.usersRepository
      .userUploads(id)
      .find()
      .then(res => {
        res.map(upload =>
          this.shareToRepository.deleteAll({upload: upload._id}),
        );
      });
    await this.usersRepository.userUploads(id).delete();
    await this.usersRepository.deleteById(id);
  }

  @authenticate.skip()
  @post('/users/login')
  @response(200, {
    description: 'Users Login',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Users, {exclude: ['password']}),
      },
    },
  })
  async findUser(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'Login',
            exclude: ['id', 'fullname'],
          }),
        },
      },
    })
    userLogin: Omit<Users, '_id'>,
  ): Promise<apiResponse> {
    const user = await this.usersRepository.findOne({
      where: {email: userLogin.email},
    });
    try {
      if (!user) throw new Error('User not found.');
      if (!(await compare(userLogin.password, user.password)))
        throw new Error('Invalid password.');
      const userCredentials = await this.userService.verifyCredentials(
        userLogin,
      );
      const userProfile =
        this.userService.convertToUserProfile(userCredentials);
      const token = await this.jwtService.generateToken(userProfile);
      user.password = '';

      return {status: 200, message: token, users: [user]};
    } catch (err) {
      return {status: 500, error: err.message};
    }
  }

  @get('/users/{id}/share-tos')
  @response(200, {
    description: 'Array of Users from Share To instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ShareTo),
      },
    },
  })
  async findShareToByUserId(
    @param.path.string('id') id: string,
  ): Promise<ShareTo[] | void> {
    return this.shareToRepository.find({
      where: {user: id},
      include: [
        {
          relation: 'shareToUpload',
          scope: {
            fields: ['label', 'filename', 'fileLocation', 'user'],
            include: [
              {relation: 'uploadUser', scope: {fields: ['fullname', 'email']}},
            ],
          },
        },
      ],
    });
  }
}
