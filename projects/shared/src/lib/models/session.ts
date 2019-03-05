export class Session {
  login: string;
  token: string;
  validUntil: number;
  get isValid(): boolean {
    return this.validUntil > Date.now();
  }
}
