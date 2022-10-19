import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Uploads, UploadsRelations, Users, ShareTo} from '../models';
import {UsersRepository} from './users.repository';
import {ShareToRepository} from './share-to.repository';

export class UploadsRepository extends DefaultCrudRepository<
  Uploads,
  typeof Uploads.prototype._id,
  UploadsRelations
> {

  public readonly uploadUser: BelongsToAccessor<Users, typeof Uploads.prototype._id>;

  public readonly uploadShareToUsers: HasManyThroughRepositoryFactory<Users, typeof Users.prototype._id,
          ShareTo,
          typeof Uploads.prototype._id
        >;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('ShareToRepository') protected shareToRepositoryGetter: Getter<ShareToRepository>,
  ) {
    super(Uploads, dataSource);
    this.uploadShareToUsers = this.createHasManyThroughRepositoryFactoryFor('uploadShareToUsers', usersRepositoryGetter, shareToRepositoryGetter,);
    this.registerInclusionResolver('uploadShareToUsers', this.uploadShareToUsers.inclusionResolver);
    this.uploadUser = this.createBelongsToAccessorFor('uploadUser', usersRepositoryGetter,);
    this.registerInclusionResolver('uploadUser', this.uploadUser.inclusionResolver);
  }
}
