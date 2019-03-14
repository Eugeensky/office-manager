import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/shared/src/enviroments/enviroments';

@Component({
  selector: 'shared-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit {

  private floorNumber: number;
  private roomId: number;
  public requestForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.floorNumber = params.floorNumber;
      this.roomId = params.roomId;
    });
  }
  ngOnInit() {
    this.requestForm = new FormGroup({
      roomId: new FormControl(this.roomId, Validators.required),
      text: new FormControl('', Validators.required)
    });
  }

  public sendRequest() {
    this.http.post(`requests`, this.requestForm.value).subscribe(isOpened => {
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
