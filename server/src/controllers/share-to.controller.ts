import {repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ShareTo} from '../models';
import {ShareToRepository} from '../repositories';

export class ShareToController {
  constructor(
    @repository(ShareToRepository)
    public shareToRepository: ShareToRepository,
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
  async find(): Promise<ShareTo[]> {
    return this.shareToRepository.find();
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
  async findById(@param.path.string('id') id: string): Promise<ShareTo> {
    return this.shareToRepository.findById(id);
  }

  @del('/share-tos/{id}')
  @response(204, {
    description: 'ShareTo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.shareToRepository.deleteById(id);
  }
}
