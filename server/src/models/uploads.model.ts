import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Users} from './users.model';
import {ShareTo} from './share-to.model';

@model()
export class Uploads extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  label: string;

  @property({
    type: 'string',
    required: true,
  })
  filename: string;

  @property({
    type: 'string',
    required: true,
  })
  fileLocation: string;

  @belongsTo(() => Users, {name: 'uploadUser'})
  user: string;

  @hasMany(() => Users, {through: {model: () => ShareTo, keyFrom: 'upload', keyTo: 'user'}})
  uploadShareToUsers: Users[];

  constructor(data?: Partial<Uploads>) {
    super(data);
  }
}

export interface UploadsRelations {
  // describe navigational properties here
}

export type UploadsWithRelations = Uploads & UploadsRelations;
