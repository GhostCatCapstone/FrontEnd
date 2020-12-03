
export class LoginRequest {
  constructor(
    public userID: string,
    public passwordHash: string
  ) {}
}
