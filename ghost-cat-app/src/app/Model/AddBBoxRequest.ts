export class AddBBoxRequest {
    constructor(
        public userID: string,
        public authToken: string,
        public projectID: string,
        public imgId: string,
        public xVal: number,
        public yVal: number,
        public width: number,
        public height: number,
        public className: string) { }
}
