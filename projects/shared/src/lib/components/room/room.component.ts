import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestInfo } from '../../models/request-info';
import { RequestStatus } from '../../models/request-status';

@Component({
  selector: 'shared-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  public floorNumber: number;
  public roomNumber: number;
  public roomId: number;
  public requestsInfo: RequestInfo[];
  public RequestStatus = RequestStatus;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.floorNumber = this.route.snapshot.queryParams.floorNumber;
    this.roomNumber = this.route.snapshot.queryParams.roomNumber;
    this.roomId = this.route.snapshot.queryParams.roomId;
    this.route.data.subscribe(data => this.requestsInfo = data.requestsInfo);
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
}
