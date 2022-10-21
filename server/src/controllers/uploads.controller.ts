import {repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Uploads} from '../models';
import {UploadsRepository} from '../repositories';

export class UploadsController {
  constructor(
    @repository(UploadsRepository)
    public uploadsRepository: UploadsRepository,
  ) {}

  @post('/uploads')
  @response(200, {
    description: 'Uploads model instance',
    content: {'application/json': {schema: getModelSchemaRef(Uploads)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Uploads, {
            title: 'NewUploads',
            exclude: ['_id'],
          }),
        },
      },
    })
    uploads: Omit<Uploads, '_id'>,
  ): Promise<Uploads> {
    return this.uploadsRepository.create(uploads);
  }

  @get('/uploads')
  @response(200, {
    description: 'Array of Uploads model instances',
    content: {
      'application/json': {
        schema: {type: 'array', items: getModelSchemaRef(Uploads)},
      },
    },
  })
  async find(): Promise<Uploads[]> {
    return this.uploadsRepository.find();
  }

  @get('/uploads/{id}')
  @response(200, {
    description: 'Uploads model instance',
    content: {'application/json': {schema: getModelSchemaRef(Uploads)}},
  })
  async findById(@param.path.string('id') id: string): Promise<Uploads> {
    return this.uploadsRepository.findById(id);
  }

  @patch('/uploads/{id}')
  @response(204, {description: 'Uploads PATCH success'})
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Uploads, {exclude: ['_id','filename','fileLocation','user']}),
        },
      },
    })
    uploads: Uploads,
  ): Promise<void> {
    await this.uploadsRepository.updateById(id, uploads);
  }

  @del('/uploads/{id}')
  @response(204, {
    description: 'Uploads DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.uploadsRepository.deleteById(id);
  }
}
