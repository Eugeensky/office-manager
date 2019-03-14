import { Request } from './request';

export class Room {
  id: number;
  number: string;
  requests: Request[];
}
