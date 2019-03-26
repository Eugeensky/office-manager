import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'shared-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit {

  private floorNumber: number;
  private roomId: number;
  public requestControl: FormControl;
  public roomNumber: number;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.floorNumber = params.floorNumber;
      this.roomId = params.roomId;
      this.roomNumber = params.roomNumber;
    });
  }
  ngOnInit() {
    this.requestControl = new FormControl('', Validators.required);
  }

  public sendRequest() {
    if (this.requestControl.valid) {
      this.http.post(`requests`, { roomId: this.roomId, text: `open: ${this.requestControl.value}` }).subscribe(isOpened => {
        if (isOpened) {
          this.router.navigateByUrl(`floors/${this.floorNumber}`);
        }
      });
    }
  }

  public backToFloor() {
    this.router.navigateByUrl(`floors/${this.floorNumber}`);
    return false;
  }
}
