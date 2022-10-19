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
  Users,
  Uploads,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersUploadsController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/uploads', {
    responses: {
      '200': {
        description: 'Array of Users has many Uploads',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Uploads)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Uploads>,
  ): Promise<Uploads[]> {
    return this.usersRepository.userUploads(id).find(filter);
  }

  @post('/users/{id}/uploads', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Uploads)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Users.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Uploads, {
            title: 'NewUploadsInUsers',
            exclude: ['_id'],
            optional: ['user']
          }),
        },
      },
    }) uploads: Omit<Uploads, '_id'>,
  ): Promise<Uploads> {
    return this.usersRepository.userUploads(id).create(uploads);
  }

  @patch('/users/{id}/uploads', {
    responses: {
      '200': {
        description: 'Users.Uploads PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Uploads, {partial: true}),
        },
      },
    })
    uploads: Partial<Uploads>,
    @param.query.object('where', getWhereSchemaFor(Uploads)) where?: Where<Uploads>,
  ): Promise<Count> {
    return this.usersRepository.userUploads(id).patch(uploads, where);
  }

  @del('/users/{id}/uploads', {
    responses: {
      '200': {
        description: 'Users.Uploads DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Uploads)) where?: Where<Uploads>,
  ): Promise<Count> {
    return this.usersRepository.userUploads(id).delete(where);
  }
}
