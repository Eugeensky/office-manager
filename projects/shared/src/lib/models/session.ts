export class Session {
  login: string;
  token: string;
  validUntil: number;

  static getFromParams(params: any): Session {
    if (params.login && params.token && params.validUntil) {
      const session: Session = new Session();
      session.login = params.login;
      session.token = params.token;
      session.validUntil = params.validUntil;
      return session;
    } else {
      throw new Error('Invalid params');
    }
  }

  isValid(): boolean {
    return this.validUntil > Date.now();
  }
}
