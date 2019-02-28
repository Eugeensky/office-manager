export class Session {
  login: string;
  token: string;
  validUntil: Date;

  static getFromParams(params: any): Session {
    if (params.login && params.token && params.validUntil) {
      const session: Session = new Session();
      session.login = params.login;
      session.token = params.token;
      session.validUntil = new Date(params.validUntil);
      return session;
    } else {
      throw new Error('Invalid params');
    }
  }
}
