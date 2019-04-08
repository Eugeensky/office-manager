import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FloorPlan } from '../../../models/floor-plan';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-floor',
  templateUrl: './new-floor.component.html',
  styleUrls: ['./new-floor.component.scss']
})
export class NewFloorComponent implements OnInit {

  public roomsFormGroup: FormGroup;
  public addStatus: string;
  public isAdded: boolean;
  @Output() floorAdded: EventEmitter<number> = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.createRoomsGroup();
  }

  ngOnInit() {
  }

  public deleteRoom(index: number) {
    (this.roomsFormGroup.controls.rooms as FormArray).removeAt(index);
  }

  public addRoom() {
    (this.roomsFormGroup.controls.rooms as FormArray)
      .push(this.formBuilder.group({id: 0, roomNumber: ['', Validators.required]}));
  }

  public saveSettings() {
    if (!this.roomsFormGroup.valid) {
      if (!this.roomsFormGroup.controls.floorNumber.valid) {
      this.roomsFormGroup.controls.floorNumber.markAsDirty();
      }
      (this.roomsFormGroup.controls.rooms as FormArray).controls.forEach(control => {
        if (!control.valid) {
          (control as FormGroup).controls.roomNumber.markAsDirty();
        }
      });
      return;
    }
    const newFloorPlan: FloorPlan = new FloorPlan();
    newFloorPlan.floorNumber = +this.roomsFormGroup.value.floorNumber;
    newFloorPlan.rooms = this.roomsFormGroup.value.rooms;
    this.http.post<boolean>('floors/add', newFloorPlan).subscribe(isAdded => {
      this.isAdded = isAdded;
      if (isAdded) {
        this.floorAdded.emit(newFloorPlan.floorNumber);
        this.addStatus = 'Success';
      } else {
        this.addStatus = 'Error';
      }
      this.createRoomsGroup();
    });
  }

  public createRoomsGroup() {
    this.roomsFormGroup = this.formBuilder.group({
      floorNumber: this.formBuilder.control('', Validators.required),
      rooms: this.formBuilder.array([this.formBuilder.group({id: 0, roomNumber: ['', Validators.required]})])
    });
  }
}
