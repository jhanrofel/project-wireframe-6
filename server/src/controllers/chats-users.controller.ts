import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Chats,
  Users,
} from '../models';
import {ChatsRepository} from '../repositories';

export class ChatsUsersController {
  constructor(
    @repository(ChatsRepository)
    public chatsRepository: ChatsRepository,
  ) { }

  @get('/chats/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Chats',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.string('id') id: typeof Chats.prototype._id,
  ): Promise<Users> {
    return this.chatsRepository.chatUser(id);
  }
}
