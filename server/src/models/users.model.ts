import {Entity, model, property, hasMany} from '@loopback/repository';
import {Chats} from './chats.model';
import {Uploads} from './uploads.model';

@model()
export class Users extends Entity {
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
  fullname: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Chats, {keyTo: 'user'})
  userChats: Chats[];

  @hasMany(() => Uploads, {keyTo: 'user'})
  userUploads: Uploads[];

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
