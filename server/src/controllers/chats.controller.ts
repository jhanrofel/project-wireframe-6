import {repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  requestBody,
  response,
} from '@loopback/rest';
import {Chats} from '../models';
import {ChatsRepository} from '../repositories';

export class ChatsController {
  constructor(
    @repository(ChatsRepository)
    public chatsRepository: ChatsRepository,
  ) {}

  @post('/chats')
  @response(200, {
    description: 'Chats model instance',
    content: {'application/json': {schema: getModelSchemaRef(Chats)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chats, {
            title: 'NewChats',
            exclude: ['_id'],
          }),
        },
      },
    })
    chats: Omit<Chats, '_id'>,
  ): Promise<Chats> {
    return this.chatsRepository.create(chats);
  }

  @get('/chats')
  @response(200, {
    description: 'Array of Chats model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Chats),
        },
      },
    },
  })
  async find(): Promise<Chats[]> {
    return this.chatsRepository.find({
      include: [{relation: 'chatUser', scope: {fields: ['fullname']}}],
    });
  }

  @get('/chats/{id}')
  @response(200, {
    description: 'Chats model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Chats),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Chats> {
    return this.chatsRepository.findById(id, {
      include: [{relation: 'chatUser', scope: {fields: ['fullname']}}],
    });
  }
}
