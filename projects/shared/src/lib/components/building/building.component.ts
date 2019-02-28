import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FloorInfo } from '../../models/floor-info';

@Component({
  selector: 'shared-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => this.floorsInfo = data.floorsInfo);
  }

  public floorsInfo: FloorInfo[];
  ngOnInit() {
  }

}
