import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {ShareTo, ShareToRelations, Users} from '../models';
import {UsersRepository} from './users.repository';

export class ShareToRepository extends DefaultCrudRepository<
  ShareTo,
  typeof ShareTo.prototype._id,
  ShareToRelations
> {
  public readonly shareToUser: BelongsToAccessor<
    Users,
    typeof ShareTo.prototype._id
  >;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
    @repository.getter('UsersRepository')
    protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(ShareTo, dataSource);
    this.shareToUser = this.createBelongsToAccessorFor(
      'shareToUser',
      usersRepositoryGetter,
    );
    this.registerInclusionResolver(
      'shareToUser',
      this.shareToUser.inclusionResolver,
    );
  }
}
