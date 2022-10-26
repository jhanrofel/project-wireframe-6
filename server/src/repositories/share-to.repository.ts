import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {ShareTo, ShareToRelations, Uploads, Users} from '../models';
import {UsersRepository} from './users.repository';
import {UploadsRepository} from './uploads.repository';

export class ShareToRepository extends DefaultCrudRepository<
  ShareTo,
  typeof ShareTo.prototype.id,
  ShareToRelations
> {
  public readonly shareToUser: BelongsToAccessor<
    Users,
    typeof ShareTo.prototype.id
  >;
  
  public readonly shareToUpload: BelongsToAccessor<
    Uploads,
    typeof ShareTo.prototype.id
  >;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
    @repository.getter('UsersRepository')
    protected usersRepositoryGetter: Getter<UsersRepository>,
    @repository.getter('UploadsRepository')
    protected uploadsRepositoryGetter: Getter<UploadsRepository>,
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

    this.shareToUpload = this.createBelongsToAccessorFor(
      'shareToUpload',
      uploadsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'shareToUpload',
      this.shareToUpload.inclusionResolver,
    );
    
  }
}
