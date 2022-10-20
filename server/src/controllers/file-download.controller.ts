import {inject} from '@loopback/core';
import {
  get,
  oas,
  param,
  Response,
  RestBindings,
} from '@loopback/rest';
/**
 * A controller to handle file downloads using multipart/form-data media type
 */
export class FileDownloadController {
  @get('/files/{filename}')
  @oas.response.file()
  downloadFile(
    @param.path.string('filename') fileName: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const file = './public/uploads/'+fileName;
    response.download(file,fileName);
    return response;
  }
}
