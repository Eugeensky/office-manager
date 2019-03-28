import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatus, RequestInfo } from 'projects/shared/src/public_api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  public floorNumber: number;
  public roomNumber: number;
  public roomId: number;
  public requestsInfo: RequestInfo[];
  public RequestStatus = RequestStatus;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.floorNumber = this.route.snapshot.queryParams.floorNumber;
    this.roomNumber = this.route.snapshot.queryParams.roomNumber;
    this.roomId = this.route.snapshot.queryParams.roomId;
    this.route.data.subscribe(data => {
      this.requestsInfo = data.requestsInfo;
      this.requestsInfo.sort((x, y) => {
        if (x.postDate < y.postDate) {
          return 1;
        } else {
          return -1;
        }
      });
    });
  }

  ngOnInit() {
  }

  public backToFloor() {
    this.router.navigateByUrl(`floors/${this.floorNumber}`);
  }
  public openRequest() {
    this.router.navigateByUrl(`newRequest?floorNumber=${this.floorNumber}&roomId=${this.roomId}&roomNumber=${this.roomNumber}`);
  }
  public showMore(requestId: number) {
    this.router.navigateByUrl(
      `request?floorNumber=${this.floorNumber}&roomId=${this.roomId}&roomNumber=${this.roomNumber}&requestId=${requestId}`);
  }

  public closeRequest(requestId: number) {
    this.http.get<boolean>(`requests/close/${requestId}`).subscribe(isClosed => {
      if (isClosed) {
        for (const key in this.requestsInfo) {
          if (this.requestsInfo[key].requestId === requestId) {
            this.requestsInfo.splice(+key, 1);
            break;
          }
        }
      }
    });
  }
}
