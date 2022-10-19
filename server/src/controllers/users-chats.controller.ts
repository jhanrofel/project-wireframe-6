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
  Chats,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersChatsController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/chats', {
    responses: {
      '200': {
        description: 'Array of Users has many Chats',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Chats)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Chats>,
  ): Promise<Chats[]> {
    return this.usersRepository.userChats(id).find(filter);
  }

  @post('/users/{id}/chats', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Chats)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Users.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chats, {
            title: 'NewChatsInUsers',
            exclude: ['_id'],
            optional: ['user']
          }),
        },
      },
    }) chats: Omit<Chats, '_id'>,
  ): Promise<Chats> {
    return this.usersRepository.userChats(id).create(chats);
  }

  @patch('/users/{id}/chats', {
    responses: {
      '200': {
        description: 'Users.Chats PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chats, {partial: true}),
        },
      },
    })
    chats: Partial<Chats>,
    @param.query.object('where', getWhereSchemaFor(Chats)) where?: Where<Chats>,
  ): Promise<Count> {
    return this.usersRepository.userChats(id).patch(chats, where);
  }

  @del('/users/{id}/chats', {
    responses: {
      '200': {
        description: 'Users.Chats DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Chats)) where?: Where<Chats>,
  ): Promise<Count> {
    return this.usersRepository.userChats(id).delete(where);
  }
}
