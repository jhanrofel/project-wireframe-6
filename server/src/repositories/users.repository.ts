import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Users, UsersRelations, Chats} from '../models';
import {ChatsRepository} from './chats.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype._id,
  UsersRelations
> {

  public readonly userChats: HasManyRepositoryFactory<Chats, typeof Users.prototype._id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('ChatsRepository') protected chatsRepositoryGetter: Getter<ChatsRepository>,
  ) {
    super(Users, dataSource);
    this.userChats = this.createHasManyRepositoryFactoryFor('userChats', chatsRepositoryGetter,);
    this.registerInclusionResolver('userChats', this.userChats.inclusionResolver);
  }
}
