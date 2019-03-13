import { RequestStatus } from './request-status';
import { Comment } from './comment';

export class Request {
  id: number;
  status: RequestStatus;
  openDate: Date;
  comments: Comment[];
}
