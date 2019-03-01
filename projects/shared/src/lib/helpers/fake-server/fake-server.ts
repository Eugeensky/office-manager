import { User } from '../../models/user';
import { UserSessionInfo } from '../../models/user-session-info';
import { AuthResponse } from '../../models/auth-response';
import { FloorInfo } from '../../models/floor-info';
import { Session } from '../../models/session';

const userStorage: UserSessionInfo[] = [
  { login: 'admin', password: 'admin', role: 'admin', token: 'adminfaketoken228', validUntil: +(new Date(2020, 1)) },
  { login: 'sasha', password: 'sasha', role: 'user', token: 'sashafaketoken228', validUntil: +(new Date(2020, 1)) },
  { login: 'pasha', password: 'pasha', role: 'user', token: 'pashafaketoken228', validUntil: +(new Date(2020, 1)) }
];
const adminFloorsInfo: FloorInfo[] = [
  { floor: 1, requestCount: 10 },
  { floor: 2, requestCount: 15 },
  { floor: 3, requestCount: 11 },
  { floor: 4, requestCount: 8 },
  { floor: 5, requestCount: 252 }
];
const userFloorsInfo: FloorInfo[] = [
  { floor: 1, requestCount: 2 },
  { floor: 2, requestCount: 5 },
  { floor: 3, requestCount: 3 },
  { floor: 4, requestCount: 0 },
  { floor: 5, requestCount: 1 },
];

export class FakeServer {

  public static getUserInfo(user: User): AuthResponse {
    const userSessionInfo = userStorage.find(x => x.login === user.login && x.password === user.password);
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
      validUntil: 0
    };
  }

  public static getFloorsInfo(session: Session): FloorInfo[] {
    const user = userStorage.find(x => x.login === session.login && x.token === session.token);
    if (user && user.role === 'admin') {
      return adminFloorsInfo.reverse();
    } else if (user && user.role === 'user') {
      return userFloorsInfo.reverse();
    }
    return null;
  }
}
