import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'projects/shared/src/lib/models/request';
import { FormControl } from '@angular/forms';
import { NewCommentModel } from 'projects/shared/src/lib/models/new-comment-model';
import { RequestStatus } from 'projects/shared/src/lib/models/request-status';
import { HttpClient } from '@angular/common/http';
import { Comment } from 'projects/shared/src/lib/models/comment';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  private roomId: number;
  private requestId: number;

  public requestInfo: Request;
  public newComment = new FormControl();
  public floorNumber: number;
  public roomNumber: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.data.subscribe(data => {
      this.requestInfo = data.requestInfo;
      this.requestInfo.comments.reverse();
    });

    this.roomNumber = this.route.snapshot.queryParams.roomNumber;
    this.floorNumber = this.route.snapshot.queryParams.floorNumber;
    this.roomId = this.route.snapshot.queryParams.roomId;
    this.requestId = this.route.snapshot.queryParams.requestId;
  }

  ngOnInit() {
  }

  public backToRoom() {
    this.router.navigateByUrl(`rooms?floorNumber=${this.floorNumber}&roomId=${this.roomId}&roomNumber=${this.roomNumber}`);
  }

  public backToFloor() {
    this.router.navigateByUrl(`floors/${this.floorNumber}`);
  }

  public changeStatusWithComment(status: RequestStatus) {
    const commentText = `${this.requestInfo.status !== status ? RequestStatus[status] : 'Not changed'}: ${this.newComment.value}`;
    const newComment = new NewCommentModel(
      commentText,
      status,
      this.requestId
    );
    this.http.post<Comment>('requests/postComment', newComment).subscribe(comment => {
      if (comment) {
        this.requestInfo.comments.unshift(comment);
        this.requestInfo.status = newComment.status;
        this.newComment.setValue('');
      }
    });
  }

  public closeRequest() {
    this.http.get<boolean>(`requests/close/${this.requestId}`).subscribe(isClosed => {
      if (isClosed) {
        this.router.navigateByUrl('');
      }
    });
  }
}
