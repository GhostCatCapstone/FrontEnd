import { CameraTrap } from "./CameraTraps"

export class GetCameraTrapsResponse {
    constructor(
    public cameraTraps: CameraTrap[],
    public errorMsg: string,
    public success: boolean,
    ) {}
}