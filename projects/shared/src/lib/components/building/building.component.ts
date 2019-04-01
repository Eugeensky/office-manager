import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FloorInfo } from '../../models/floor-info';
import {HostListener} from '@angular/core';

@Component({
  selector: 'shared-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements AfterViewInit {

  @ViewChild('floorScroll') floorScroll: ElementRef;
  public floorsInfo: FloorInfo[];
  public isScrollOnBottom: boolean;
  public isScrollOnTop: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.data.subscribe(data => {
      this.floorsInfo = data.floorsInfo;
      this.floorsInfo.reverse();
    });
  }

  ngAfterViewInit() {
    const floorsCount = this.floorsInfo.length;
    const floorsOverScroll = floorsCount - 5;
    this.floorScroll.nativeElement.onscroll = () => {
      if (this.floorScroll.nativeElement.scrollTop >
        ((this.floorScroll.nativeElement.scrollHeight / floorsCount) * floorsOverScroll - 5)) {
        this.isScrollOnBottom = true;
      } else {
          this.isScrollOnBottom = false;
      }

      if (this.floorScroll.nativeElement.scrollTop < 5) {
        this.isScrollOnTop = true;
      } else {
        this.isScrollOnTop = false;
      }
    };

    this.floorScroll.nativeElement.scrollTop = (this.floorScroll.nativeElement.scrollHeight / floorsCount) * floorsOverScroll;
  }

  public scrollUp() {
    if (this.isScrollOnTop) {
      return;
    }
    const floorsCount = this.floorsInfo.length;
    const oneFloorHeight = this.floorScroll.nativeElement.scrollHeight / floorsCount;
    const currentFloor = Math.trunc(this.floorScroll.nativeElement.scrollTop / (oneFloorHeight + 5));
    const newScrollTop = currentFloor * oneFloorHeight;
    let i = 1;
    for (let currentScrollTop = this.floorScroll.nativeElement.scrollTop; currentScrollTop > newScrollTop - 1; currentScrollTop--) {
      setTimeout(() => this.floorScroll.nativeElement.scrollTop = currentScrollTop, i);
      i++;
    }
  }

  public scrollDown() {
    if (this.isScrollOnBottom) {
      return;
    }
    const floorsCount = this.floorsInfo.length;
    const oneFloorHeight = this.floorScroll.nativeElement.scrollHeight / floorsCount;
    const currentFloor = Math.trunc(this.floorScroll.nativeElement.scrollTop / (oneFloorHeight - 5));
    const newScrollTop = (currentFloor + 1) * oneFloorHeight;
    let i = 1;
    for (let currentScrollTop = this.floorScroll.nativeElement.scrollTop; currentScrollTop < newScrollTop + 1; currentScrollTop++) {
      setTimeout(() => this.floorScroll.nativeElement.scrollTop = currentScrollTop, i);
      i++;
    }
  }

  public goToFloor(floorNumber: number) {
    this.router.navigateByUrl(`floors/${floorNumber}`);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.scrollUp();
    }
    if (event.key === 'ArrowDown') {
      this.scrollDown();
    }
  }
}
