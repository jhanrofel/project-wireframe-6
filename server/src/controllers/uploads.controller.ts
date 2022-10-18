import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Uploads} from '../models';
import {UploadsRepository} from '../repositories';

export class UploadsController {
  constructor(
    @repository(UploadsRepository)
    public uploadsRepository : UploadsRepository,
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

  @get('/uploads/count')
  @response(200, {
    description: 'Uploads model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Uploads) where?: Where<Uploads>,
  ): Promise<Count> {
    return this.uploadsRepository.count(where);
  }

  @get('/uploads')
  @response(200, {
    description: 'Array of Uploads model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Uploads, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Uploads) filter?: Filter<Uploads>,
  ): Promise<Uploads[]> {
    return this.uploadsRepository.find(filter);
  }

  @patch('/uploads')
  @response(200, {
    description: 'Uploads PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Uploads, {partial: true}),
        },
      },
    })
    uploads: Uploads,
    @param.where(Uploads) where?: Where<Uploads>,
  ): Promise<Count> {
    return this.uploadsRepository.updateAll(uploads, where);
  }

  @get('/uploads/{id}')
  @response(200, {
    description: 'Uploads model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Uploads, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Uploads, {exclude: 'where'}) filter?: FilterExcludingWhere<Uploads>
  ): Promise<Uploads> {
    return this.uploadsRepository.findById(id, filter);
  }

  @patch('/uploads/{id}')
  @response(204, {
    description: 'Uploads PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Uploads, {partial: true}),
        },
      },
    })
    uploads: Uploads,
  ): Promise<void> {
    await this.uploadsRepository.updateById(id, uploads);
  }

  @put('/uploads/{id}')
  @response(204, {
    description: 'Uploads PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() uploads: Uploads,
  ): Promise<void> {
    await this.uploadsRepository.replaceById(id, uploads);
  }

  @del('/uploads/{id}')
  @response(204, {
    description: 'Uploads DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.uploadsRepository.deleteById(id);
  }
}
