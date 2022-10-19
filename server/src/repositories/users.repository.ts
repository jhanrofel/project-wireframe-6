import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Users, UsersRelations, Chats, Uploads} from '../models';
import {ChatsRepository} from './chats.repository';
import {UploadsRepository} from './uploads.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype._id,
  UsersRelations
> {

  public readonly userChats: HasManyRepositoryFactory<Chats, typeof Users.prototype._id>;

  public readonly userUploads: HasManyRepositoryFactory<Uploads, typeof Users.prototype._id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('ChatsRepository') protected chatsRepositoryGetter: Getter<ChatsRepository>, @repository.getter('UploadsRepository') protected uploadsRepositoryGetter: Getter<UploadsRepository>,
  ) {
    super(Users, dataSource);
    this.userUploads = this.createHasManyRepositoryFactoryFor('userUploads', uploadsRepositoryGetter,);
    this.registerInclusionResolver('userUploads', this.userUploads.inclusionResolver);
    this.userChats = this.createHasManyRepositoryFactoryFor('userChats', chatsRepositoryGetter,);
    this.registerInclusionResolver('userChats', this.userChats.inclusionResolver);
  }
}
