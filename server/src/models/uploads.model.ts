import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Uploads>) {
    super(data);
  }
}

export interface UploadsRelations {
  // describe navigational properties here
}

export type UploadsWithRelations = Uploads & UploadsRelations;
