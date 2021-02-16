export class RegisterRequest {
  constructor(public UserID: string, public passwordHash: string) {}
}
