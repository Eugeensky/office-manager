import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FloorPlan } from '../../../models/floor-plan';
import { RoomPlan } from '../../../models/room-plan';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-floor',
  templateUrl: './edit-floor.component.html',
  styleUrls: ['./edit-floor.component.scss']
})
export class EditFloorComponent implements OnChanges {

  public roomsFormGroup: FormGroup = this.formBuilder.group({floorNumber: '', rooms: {}});
  public updateStatus: string;
  private floorPlan: FloorPlan;

  public isUpdated: boolean;
  @Input() floorNumber: number;
  @Output() floorDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges) {
    this.floorNumber = changes.floorNumber.currentValue;
    this.http.get<FloorPlan>(`floors/numbers/${this.floorNumber}`).subscribe(floorPlan => {
      this.floorPlan = floorPlan;
      this.createRoomsGroup();
    });
  }

  public deleteRoom(index: number) {
    (this.roomsFormGroup.controls.rooms as FormArray).removeAt(index);
  }

  public addRoom() {
    (this.roomsFormGroup.controls.rooms as FormArray).push(this.formBuilder.group({id: 0, roomNumber: ['', Validators.required]}));
  }

  public saveSettings() {
    if (!this.roomsFormGroup.valid) {
      (this.roomsFormGroup.controls.rooms as FormArray).controls.forEach(control => {
        if (!control.valid) {
          (control as FormGroup).controls.roomNumber.markAsDirty();
        }
      });
      return;
    }
    const updatedFloorPlan: FloorPlan = this.roomsFormGroup.value;
    this.http.post<boolean>('floors/edit', updatedFloorPlan).subscribe(isUpdated => {
      this.isUpdated = isUpdated;
      if (isUpdated) {
        this.floorPlan = updatedFloorPlan;
        this.updateStatus = 'Success';
      } else {
        this.createRoomsGroup();
        this.updateStatus = 'Error';
      }
    });
  }

  public deleteFloor() {
    this.http.delete<boolean>(`floors/delete/${this.floorNumber}`).subscribe(isDeleted => {
      if (isDeleted) {
        this.floorDeleted.emit(this.floorNumber);
      } else {
        this.isUpdated = false;
        this.updateStatus = 'Error';
      }
    });
  }

  public createRoomsGroup() {
    this.roomsFormGroup = this.formBuilder.group({
      floorNumber: this.formBuilder.control(this.floorNumber, Validators.required),
      rooms: this.formBuilder.array(this.floorPlan.rooms.map(room => this.createRoomGroup(room)))
    });
  }

  private createRoomGroup(room: RoomPlan) {
    return this.formBuilder.group({
      id: [room.id, Validators.required],
      roomNumber: [room.roomNumber, Validators.required]
    });
  }
}
