export class DeleteBBoxRequest {
  constructor(
    public userID: string,
    public authToken: string,
    public projectID: string,
    public bboxID: string
  ) { }
}
