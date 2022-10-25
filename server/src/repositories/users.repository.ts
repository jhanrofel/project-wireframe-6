import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Users, UsersRelations, Chats, Uploads, UserCredentials} from '../models';
import {ChatsRepository} from './chats.repository';
import {UploadsRepository} from './uploads.repository';
import {UserCredentialsRepository} from './user-credentials.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly userChats: HasManyRepositoryFactory<Chats, typeof Users.prototype.id>;

  public readonly userUploads: HasManyRepositoryFactory<Uploads, typeof Users.prototype.id>;

  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof Users.prototype.id
  >;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, 
    @repository.getter('ChatsRepository') protected chatsRepositoryGetter: Getter<ChatsRepository>, 
    @repository.getter('UploadsRepository') protected uploadsRepositoryGetter: Getter<UploadsRepository>,
    @repository.getter('UserCredentialsRepository') protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
  ) {
    super(Users, dataSource);
    this.userUploads = this.createHasManyRepositoryFactoryFor('userUploads', uploadsRepositoryGetter,);
    this.registerInclusionResolver('userUploads', this.userUploads.inclusionResolver);
    this.userChats = this.createHasManyRepositoryFactoryFor('userChats', chatsRepositoryGetter,);
    this.registerInclusionResolver('userChats', this.userChats.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter,);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
  }

  async findCredentials(
    userId: typeof Users.prototype.id,
  ): Promise<UserCredentials | undefined> {
    return this.userCredentials(userId)
      .get()
      .catch(err => {
        if (err.code === 'ENTITY_NOT_FOUND') return undefined;
        throw err;
      });
  }
}
