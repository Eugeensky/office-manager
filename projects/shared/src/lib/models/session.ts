export class Session {

  constructor(params: any = {}) {
    if (params.login && params.token && params.validUntil) {
      this.login = params.login;
      this.token = params.token;
      this.validUntil = params.validUntil;
    }
  }

  login: string;
  token: string;
  validUntil: number;
  get isValid(): boolean {
    return this.validUntil > Date.now();
  }
}
