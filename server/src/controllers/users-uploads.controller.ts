import {repository} from '@loopback/repository';
import {get, param} from '@loopback/rest';
import {Uploads} from '../models';
import {UsersRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class UsersUploadsController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) {}

  @get('/users/{id}/uploads', {
    responses: {
      '200': {description: 'Array of Uploads by User'},
    },
  })
  async find(@param.path.string('id') id: string): Promise<Uploads[]> {
    return this.usersRepository.userUploads(id).find();
  }
}
