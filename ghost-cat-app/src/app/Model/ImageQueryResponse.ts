import { Image } from './Image';

export class ImageQueryResponse {
  constructor(
    public images: Image[],
    public errorMsg: string,
    public success: boolean
  ) {}
}
