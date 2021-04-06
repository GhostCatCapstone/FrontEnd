export class DeleteBBoxRequest {
  constructor(
    public userID: string,
    public projectID: string,
    public bboxID: string
  ) { }
}
