import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent {

  @ViewChild('requestControlEl') requestControlEl: ElementRef;
  private floorNumber: number;
  private roomId: number;
  public requestControl = new FormControl('', Validators.required);
  public roomNumber: number;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.floorNumber = params.floorNumber;
      this.roomId = params.roomId;
      this.roomNumber = params.roomNumber;
    });
  }

  public sendRequest() {
    if (!this.requestControl.valid) {
      this.requestControl.markAsDirty();
      this.requestControlEl.nativeElement.focus();
      return;
    }

    this.http.post(`requests`, { roomId: this.roomId, text: `Opened: ${this.requestControl.value}` }).subscribe(isOpened => {
      if (isOpened) {
        this.router.navigateByUrl(`floors/${this.floorNumber}`);
      }
    });
  }

  public backToFloor() {
    this.router.navigateByUrl(`floors/${this.floorNumber}`);
    return false;
  }
}
