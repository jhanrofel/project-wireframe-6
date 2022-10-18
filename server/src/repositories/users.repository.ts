import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Users, UsersRelations} from '../models';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype._id,
  UsersRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Users, dataSource);
  }
}
