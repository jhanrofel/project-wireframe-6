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
import {ShareTo} from '../models';
import {ShareToRepository} from '../repositories';

export class ShareToController {
  constructor(
    @repository(ShareToRepository)
    public shareToRepository : ShareToRepository,
  ) {}

  @post('/share-tos')
  @response(200, {
    description: 'ShareTo model instance',
    content: {'application/json': {schema: getModelSchemaRef(ShareTo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShareTo, {
            title: 'NewShareTo',
            exclude: ['_id'],
          }),
        },
      },
    })
    shareTo: Omit<ShareTo, '_id'>,
  ): Promise<ShareTo> {
    return this.shareToRepository.create(shareTo);
  }

  @get('/share-tos/count')
  @response(200, {
    description: 'ShareTo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ShareTo) where?: Where<ShareTo>,
  ): Promise<Count> {
    return this.shareToRepository.count(where);
  }

  @get('/share-tos')
  @response(200, {
    description: 'Array of ShareTo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ShareTo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ShareTo) filter?: Filter<ShareTo>,
  ): Promise<ShareTo[]> {
    return this.shareToRepository.find(filter);
  }

  @patch('/share-tos')
  @response(200, {
    description: 'ShareTo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShareTo, {partial: true}),
        },
      },
    })
    shareTo: ShareTo,
    @param.where(ShareTo) where?: Where<ShareTo>,
  ): Promise<Count> {
    return this.shareToRepository.updateAll(shareTo, where);
  }

  @get('/share-tos/{id}')
  @response(200, {
    description: 'ShareTo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ShareTo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ShareTo, {exclude: 'where'}) filter?: FilterExcludingWhere<ShareTo>
  ): Promise<ShareTo> {
    return this.shareToRepository.findById(id, filter);
  }

  @patch('/share-tos/{id}')
  @response(204, {
    description: 'ShareTo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShareTo, {partial: true}),
        },
      },
    })
    shareTo: ShareTo,
  ): Promise<void> {
    await this.shareToRepository.updateById(id, shareTo);
  }

  @put('/share-tos/{id}')
  @response(204, {
    description: 'ShareTo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() shareTo: ShareTo,
  ): Promise<void> {
    await this.shareToRepository.replaceById(id, shareTo);
  }

  @del('/share-tos/{id}')
  @response(204, {
    description: 'ShareTo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.shareToRepository.deleteById(id);
  }
}
