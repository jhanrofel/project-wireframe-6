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
import {Uploads, ShareTo, Users} from '../models';
import {
  UploadsRepository,
  ShareToRepository,
  UsersRepository,
} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class UploadsController {
  constructor(
    @repository(UploadsRepository)
    public uploadsRepository: UploadsRepository,
    @repository(ShareToRepository)
    public shareToRepository: ShareToRepository,
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
  ) {}

  @post('/uploads')
  @response(200, {
    description: 'Uploads model instance',
    content: {'application/json': {schema: getModelSchemaRef(Uploads)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Uploads, {
            title: 'NewUploads',
            exclude: ['_id'],
          }),
        },
      },
    })
    uploads: Omit<Uploads, '_id'>,
  ): Promise<Uploads> {
    return this.uploadsRepository.create(uploads);
  }

  @get('/uploads')
  @response(200, {
    description: 'Array of Uploads model instances',
    content: {
      'application/json': {
        schema: {type: 'array', items: getModelSchemaRef(Uploads)},
      },
    },
  })
  async find(): Promise<Uploads[]> {
    return this.uploadsRepository.find();
  }

  @get('/uploads/{id}')
  @response(200, {
    description: 'Uploads model instance',
    content: {'application/json': {schema: getModelSchemaRef(Uploads)}},
  })
  async findById(@param.path.string('id') id: string): Promise<Uploads> {
    return this.uploadsRepository.findById(id);
  }

  @patch('/uploads/{id}')
  @response(204, {description: 'Uploads PATCH success'})
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Uploads, {
            exclude: ['_id', 'filename', 'fileLocation', 'user'],
          }),
        },
      },
    })
    uploads: Uploads,
  ): Promise<void> {
    await this.uploadsRepository.updateById(id, uploads);
  }

  @del('/uploads/{id}')
  @response(204, {
    description: 'Uploads DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.uploadsRepository.deleteById(id);
    await this.shareToRepository.deleteAll({upload: id});
  }

  @get('/uploads/{id}/share-tos')
  @response(200, {
    description: 'Array of Uploads from Share To instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ShareTo),
      },
    },
  })
  async findShareToByUploadId(
    @param.path.string('id') id: string,
  ): Promise<ShareTo[] | void> {
    return this.shareToRepository.find({
      where: {upload: id},
      include: [{relation: 'shareToUser', scope: {fields: ['fullname']}}],
    });
  }

  @get('/uploads/{id}/choose-to-share')
  @response(200, {
    description: 'Array of Users that are not yet added in Share To instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ShareTo),
      },
    },
  })
  async findUserToShare(
    @param.path.string('id') id: string,
  ): Promise<Users[] | void> {
    const upload = await this.uploadsRepository.findById(id);
    const shareTos = await this.shareToRepository.find({where: {upload: id}});
    let userList: string[];
    userList = shareTos.map(shareTo => shareTo.user);
    userList = [...userList, upload.user];
    return await this.usersRepository.find({
      where: {_id: {nin: userList}},
      fields: ['_id', 'fullname'],
    });
  }
}
