import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomInfo } from '../../models/room-info';

@Component({
  selector: 'shared-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.data.subscribe(data => {
      this.floorNumber = this.route.snapshot.params.floorNumber;
      const middleRoomIndex: number = Math.ceil(data.roomsInfo.length / 2);
      this.roomsTopPart = data.roomsInfo.slice(0, middleRoomIndex);
      this.roomsBottomPart = data.roomsInfo.slice(middleRoomIndex);
    });
  }

  public floorNumber: number;
  public roomsTopPart: RoomInfo;
  public roomsBottomPart: RoomInfo;
  ngOnInit() {
  }

  public backToOffice() {
    this.router.navigateByUrl('');
  }

  public openRequest(roomId: number) {
    this.router.navigateByUrl(`newRequest?floorNumber=${this.floorNumber}&roomId=${roomId}`);
  }

  public showRequests(roomId: number) {
    console.log(roomId);
  }
}
