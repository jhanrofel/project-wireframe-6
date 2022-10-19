import {Entity, model, property} from '@loopback/repository';

@model()
export class ShareTo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;


  constructor(data?: Partial<ShareTo>) {
    super(data);
  }
}

export interface ShareToRelations {
  // describe navigational properties here
}

export type ShareToWithRelations = ShareTo & ShareToRelations;
