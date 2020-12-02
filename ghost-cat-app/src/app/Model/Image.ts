import { BoundingBoxModel } from './BoundingBoxModel';

export class Image {
  constructor(
    public id: string,
    public imgWidth: number,
    public imgHeight: number,
    public flash: boolean,
    public make: string,
    public model: string,
    public date: number,
    public cameraTrap: string,
    public deployment: string,
    public night_im: string,
    public imgLink: string,
    public boundingBoxes: BoundingBoxModel[]
  ) {}
}
