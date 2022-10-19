import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Uploads,
ShareTo,
Users,
} from '../models';
import {UploadsRepository} from '../repositories';

export class UploadsUsersController {
  constructor(
    @repository(UploadsRepository) protected uploadsRepository: UploadsRepository,
  ) { }

  @get('/uploads/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Uploads has many Users through ShareTo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Users>,
  ): Promise<Users[]> {
    return this.uploadsRepository.uploadShareToUsers(id).find(filter);
  }

  @post('/uploads/{id}/users', {
    responses: {
      '200': {
        description: 'create a Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Users)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Uploads.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsersInUploads',
            exclude: ['_id'],
          }),
        },
      },
    }) users: Omit<Users, '_id'>,
  ): Promise<Users> {
    return this.uploadsRepository.uploadShareToUsers(id).create(users);
  }

  @patch('/uploads/{id}/users', {
    responses: {
      '200': {
        description: 'Uploads.Users PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Partial<Users>,
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.uploadsRepository.uploadShareToUsers(id).patch(users, where);
  }

  @del('/uploads/{id}/users', {
    responses: {
      '200': {
        description: 'Uploads.Users DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.uploadsRepository.uploadShareToUsers(id).delete(where);
  }
}
