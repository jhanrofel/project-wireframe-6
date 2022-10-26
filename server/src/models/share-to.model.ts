import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Uploads} from './uploads.model';
import {Users} from './users.model';

@model()
export class ShareTo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Users, {name: 'shareToUser'})
  user: string;

  @belongsTo(() => Uploads, {name: 'shareToUpload'})
  upload: string;

  constructor(data?: Partial<ShareTo>) {
    super(data);
  }
}

export interface ShareToRelations {
  // describe navigational properties here
}

export type ShareToWithRelations = ShareTo & ShareToRelations;
