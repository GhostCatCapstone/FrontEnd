export class LoginResponse {//NOT BEING USED ANYMORE BECAUSE OF THE WAY COGNITO WORKS FOR LOGIN
  constructor(public auth_token: string, public error_message: string) {}
}
