import { ClassValue } from './ClassValue';

export class ImageQueryRequest {
  constructor(
    public userID: string,
    //public authToken: string,
    public projectID: string,
    public minDate?: number,
    public maxDate?: number,
    public deployment?: string,
    public cameraTraps?: string[],
    public classes?: ClassValue[]
  ) { }
}
