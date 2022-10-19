import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Uploads,
  Users,
} from '../models';
import {UploadsRepository} from '../repositories';

export class UploadsUsersController {
  constructor(
    @repository(UploadsRepository)
    public uploadsRepository: UploadsRepository,
  ) { }

  @get('/uploads/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Uploads',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.string('id') id: typeof Uploads.prototype._id,
  ): Promise<Users> {
    return this.uploadsRepository.uploadUser(id);
  }
}
