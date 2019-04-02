import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FloorInfo } from '../../models/floor-info';
import { fromEvent, Subject } from 'rxjs';
import { takeWhile, takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'shared-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @ViewChild('floorScroll') floorScroll: ElementRef;
  private scrollMargin = 5;
  private defaultFloorsCount = 5;

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
    const floorsOverScroll = floorsCount - this.defaultFloorsCount;

    fromEvent(this.floorScroll.nativeElement, 'scroll').pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.isScrollOnBottom = this.floorScroll.nativeElement.scrollTop >
        ((this.floorScroll.nativeElement.scrollHeight / floorsCount) * floorsOverScroll - this.scrollMargin);
      this.isScrollOnTop = this.floorScroll.nativeElement.scrollTop < this.scrollMargin;
    });

    fromEvent(window, 'keydown').pipe(takeUntil(this.ngUnsubscribe)).subscribe((event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        this.scrollUp();
      }
      if (event.key === 'ArrowDown') {
        this.scrollDown();
      }
    });

    this.floorScroll.nativeElement.scrollTop = (this.floorScroll.nativeElement.scrollHeight / floorsCount) * floorsOverScroll;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public goToFloor(floorNumber: number) {
    this.router.navigateByUrl(`floors/${floorNumber}`);
  }

  public scrollUp() {
    if (this.isScrollOnTop) {
      return;
    }
    this.moveScroll(true);
  }

  public scrollDown() {
    if (this.isScrollOnBottom) {
      return;
    }
    this.moveScroll(false);
  }

  private moveScroll(isItMovingUp: boolean) {
    const sign = isItMovingUp ? 1 : -1;
    const floorsCount = this.floorsInfo.length;
    const oneFloorHeight = this.floorScroll.nativeElement.scrollHeight / floorsCount;
    const currentFloor = Math.trunc(this.floorScroll.nativeElement.scrollTop / (oneFloorHeight + sign * this.scrollMargin));
    const newScrollTop = isItMovingUp ? currentFloor * oneFloorHeight : (currentFloor + 1) * oneFloorHeight;
    let delay = 1;

    for (let currentScrollTop = this.floorScroll.nativeElement.scrollTop;
      sign * newScrollTop + sign < sign * currentScrollTop;
      currentScrollTop -= sign) {

      setTimeout(() => this.floorScroll.nativeElement.scrollTop = currentScrollTop, delay);
      delay++;
    }
  }
}
