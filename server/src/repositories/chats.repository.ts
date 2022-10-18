import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Chats, ChatsRelations} from '../models';

export class ChatsRepository extends DefaultCrudRepository<
  Chats,
  typeof Chats.prototype._id,
  ChatsRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Chats, dataSource);
  }
}
