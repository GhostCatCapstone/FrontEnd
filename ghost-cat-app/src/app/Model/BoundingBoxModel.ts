export class BoundingBoxModel {
  constructor(
    public id: string,
    public imgId: string,
    public xVal: number,
    public yVal: number,
    public width: number,
    public height: number,
    public classes: any
  ) {}
}