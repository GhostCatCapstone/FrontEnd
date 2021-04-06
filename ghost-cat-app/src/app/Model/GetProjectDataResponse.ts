import { ProjectData } from "./ProjectData";

export class GetProjectDataResponse {
    constructor(
        public projects: ProjectData[],
        public success: boolean,
        public errorMsg: string,
    ) { }
}
