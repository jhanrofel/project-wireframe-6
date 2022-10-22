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

export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @repository(UploadsRepository)
    public uploadsRepository: UploadsRepository,
    @repository(ShareToRepository)
    public shareToRepository: ShareToRepository,
  ) {}

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
            exclude: ['_id'],
          }),
        },
      },
    })
    users: Omit<Users, '_id'>,
  ): Promise<Users | void> {
    users.password = await hash(users.password, await genSalt());
    const response = this.usersRepository
      .create(users)
      .then(res => {
        res.password = '';
        return res;
      })
      .catch(err => {
        if (err.code == 11000) {
          return `${err.keyValue.email} email already exist.`;
        } else {
          return err;
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
  async find(): Promise<Users[]> {
    return this.usersRepository.find({fields: {password: false}});
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
          schema: getModelSchemaRef(Users, {exclude: ['_id', 'password']}),
        },
      },
    })
    users: Omit<Users, '_id,password'>,
  ): Promise<void> {
    const response = this.usersRepository
      .updateById(id, users)
      .then()
      .catch(err => {
        if (err.code == 11000) {
          return `${err.keyValue.email} email already exist.`;
        } else {
          return err;
        }
      });

    return response;
  }

  @del('/users/{id}')
  @response(204, {
    description: 'Users DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.shareToRepository.deleteAll({user:id});
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
            exclude: ['_id', 'fullname'],
          }),
        },
      },
    })
    userLogin: Omit<Users, '_id'>,
  ): Promise<Users | undefined> {
    const user = await this.usersRepository.findOne({
      where: {email: userLogin.email},
    });
    try {
      if (!user) throw new Error('User not found.');
      if (!(await compare(userLogin.password, user.password)))
        throw new Error('Invalid password.');
      user.password = '';
      return user;
    } catch (error) {
      return error.message;
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
