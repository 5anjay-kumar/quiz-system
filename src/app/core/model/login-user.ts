export class LoginUser {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public exp: string,
    public token: string,
    public role: string
  ) {}
}
