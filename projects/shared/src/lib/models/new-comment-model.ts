export class NewCommentModel {
  commentText: string;
  status: number;
  requestId: number;
  constructor(commentText: string, status: number, requestId: number) {
    this.commentText = commentText;
    this.status = status;
    this.requestId = requestId;
  }
}
