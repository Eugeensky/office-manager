import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FloorInfo } from '../../models/floor-info';

@Component({
  selector: 'shared-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {
  public maxWidth: string;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.data.subscribe(data => {
      this.floorsInfo = data.floorsInfo;
      this.floorsInfo.reverse();
    });
  }

  public floorsInfo: FloorInfo[];
  ngOnInit() {
    const width = ((document.documentElement.clientHeight - 140) / (this.floorsInfo.length + 3)) * 6;
    this.maxWidth = width + 'px';
  }
  public goToFloor(floorNumber: number) {
    this.router.navigateByUrl(`floors/${floorNumber}`);
  }
}
