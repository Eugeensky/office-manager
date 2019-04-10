import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomInfo } from 'projects/shared/src/public_api';


@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent {

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.data.subscribe(data => {
      data.roomsInfo.sort((a, b) => {
        if (a.number > b.number) {
          return 1;
        }
        if (a.number < b.number) {
          return -1;
        }
      });
      this.floorNumber = this.route.snapshot.params.floorNumber;
      const middleRoomIndex: number = Math.ceil(data.roomsInfo.length / 2);
      this.roomsTopPart = data.roomsInfo.slice(0, middleRoomIndex);
      this.roomsBottomPart = data.roomsInfo.slice(middleRoomIndex);
    });
  }

  public floorNumber: number;
  public roomsTopPart: RoomInfo[];
  public roomsBottomPart: RoomInfo[];

  public backToOffice() {
    this.router.navigateByUrl('');
  }

  public openRequest(room: RoomInfo) {
    this.router.navigateByUrl(`newRequest?floorNumber=${this.floorNumber}&roomId=${room.id}&roomNumber=${room.number}`);
  }

  public showRequests(room: RoomInfo) {
    this.router.navigateByUrl(`rooms?floorNumber=${this.floorNumber}&roomId=${room.id}&roomNumber=${room.number}`);
  }
}
