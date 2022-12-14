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
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
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
            exclude: ['id'],
          }),
        },
      },
    })
    shareTo: Omit<ShareTo, 'id'>,
  ): Promise<ShareTo> {
    const shareToOne = await this.shareToRepository.create(shareTo);
    return this.shareToRepository.findById(shareToOne.id, {
      include: [{relation: 'shareToUser', scope: {fields: ['fullname']}}],
    });
  }

  @get('/share-tos')
  @response(200, {
    description: 'Array of ShareTo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ShareTo),
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
        schema: getModelSchemaRef(ShareTo),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<ShareTo> {
    return this.shareToRepository.findById(id, {
      include: [{relation: 'shareToUser', scope: {fields: ['fullname']}}],
    });
  }

  @del('/share-tos/{id}')
  @response(204, {
    description: 'ShareTo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.shareToRepository.deleteById(id);
  }
}
