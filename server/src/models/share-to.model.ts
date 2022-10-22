import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Users} from './users.model';

@model()
export class ShareTo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  upload?: string;

  @belongsTo(() => Users, {name: 'shareToUser'})
  user: string;

  constructor(data?: Partial<ShareTo>) {
    super(data);
  }
}

export interface ShareToRelations {
  // describe navigational properties here
}

export type ShareToWithRelations = ShareTo & ShareToRelations;
