import {Entity, model, property} from '@loopback/repository';

@model()
export class Chats extends Entity {
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
  dateSend: string;

  @property({
    type: 'string',
    required: true,
  })
  message: string;


  constructor(data?: Partial<Chats>) {
    super(data);
  }
}

export interface ChatsRelations {
  // describe navigational properties here
}

export type ChatsWithRelations = Chats & ChatsRelations;
