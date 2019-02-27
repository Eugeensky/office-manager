import { User } from '../../models/user';
import { UserSessionInfo } from '../../models/user-session-info';
import { AuthResponse } from '../../models/auth-response';

export class FakeServer {
  private static fakeUserStorage: Array<UserSessionInfo> = [
    { login: 'admin', password: 'admin', role: 'admin', token: 'adminfaketoken228', validUntil: new Date(2020, 1) },
    { login: 'sasha', password: 'sasha', role: 'user', token: 'sashafaketoken228', validUntil: new Date(2020, 1) },
    { login: 'pasha', password: 'pasha', role: 'user', token: 'pashafaketoken228', validUntil: new Date(2020, 1) }
  ];

  public static GetUserInfo(user: User): AuthResponse {
    const userSessionInfo = this.fakeUserStorage.find(x => x.login === user.login && x.password === user.password);
    if (userSessionInfo) {
      return {
        isRegistred: true,
        login: userSessionInfo.login,
        role: userSessionInfo.role,
        token: userSessionInfo.token,
        validUntil: userSessionInfo.validUntil
      };
    }
    return {
      isRegistred: false,
      login: user.login,
      role: null,
      token: null,
      validUntil: new Date(1)
    };
  }
}
