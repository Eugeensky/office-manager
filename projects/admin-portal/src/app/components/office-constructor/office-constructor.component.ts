import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-office-constructor',
  templateUrl: './office-constructor.component.html',
  styleUrls: ['./office-constructor.component.scss']
})
export class OfficeConstructorComponent {

  public floorNumbers: number[];
  public isEditMode = false;
  public editingFloor: number;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => this.floorNumbers = data.floorNumbers);
  }

  public editFloor(floorNumber: number) {
    this.isEditMode = true;
    this.editingFloor = floorNumber;
  }

  public newFloor() {
    this.isEditMode = false;
  }

  public addFloor(floorNumber: number) {
    this.floorNumbers.push(floorNumber);
  }

  public deleteFloor(floorNumber: number) {
    this.isEditMode = false;
    for (const key in this.floorNumbers) {
      if (this.floorNumbers[key] === floorNumber) {
        this.floorNumbers.splice(+key, 1);
        break;
      }
    }
  }
}
