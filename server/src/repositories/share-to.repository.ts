import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {ShareTo, ShareToRelations} from '../models';

export class ShareToRepository extends DefaultCrudRepository<
  ShareTo,
  typeof ShareTo.prototype._id,
  ShareToRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(ShareTo, dataSource);
  }
}
