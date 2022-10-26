import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Users} from './users.model';

@model()
export class Chats extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  dateSend: string;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @belongsTo(() => Users, {name: 'chatUser'})
  user: string;

  constructor(data?: Partial<Chats>) {
    super(data);
  }
}

export interface ChatsRelations {
  // describe navigational properties here
}

export type ChatsWithRelations = Chats & ChatsRelations;
