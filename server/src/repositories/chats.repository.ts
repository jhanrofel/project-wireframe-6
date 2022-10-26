import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Chats, ChatsRelations, Users} from '../models';
import {UsersRepository} from './users.repository';

export class ChatsRepository extends DefaultCrudRepository<
  Chats,
  typeof Chats.prototype.id,
  ChatsRelations
> {

  public readonly chatUser: BelongsToAccessor<Users, typeof Chats.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, 
    @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Chats, dataSource);
    this.chatUser = this.createBelongsToAccessorFor('chatUser', usersRepositoryGetter,);
    this.registerInclusionResolver('chatUser', this.chatUser.inclusionResolver);
  }
}
