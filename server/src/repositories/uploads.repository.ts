import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Uploads, UploadsRelations, Users} from '../models';
import {UsersRepository} from './users.repository';

export class UploadsRepository extends DefaultCrudRepository<
  Uploads,
  typeof Uploads.prototype._id,
  UploadsRelations
> {

  public readonly uploadUser: BelongsToAccessor<Users, typeof Uploads.prototype._id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Uploads, dataSource);
    this.uploadUser = this.createBelongsToAccessorFor('uploadUser', usersRepositoryGetter,);
    this.registerInclusionResolver('uploadUser', this.uploadUser.inclusionResolver);
  }
}
