export class UpdateBBoxRequest {
    constructor(
        public userID: string,
        public authToken: string,
        public projectID: string,
        public bboxID: string,
        public correctClassName: string
    ) { }
}
