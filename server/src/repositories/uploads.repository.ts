import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Uploads, UploadsRelations} from '../models';

export class UploadsRepository extends DefaultCrudRepository<
  Uploads,
  typeof Uploads.prototype._id,
  UploadsRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Uploads, dataSource);
  }
}
