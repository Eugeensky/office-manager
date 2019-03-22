import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestInfo } from 'projects/shared/src/public_api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})
export class AllRequestsComponent implements OnInit {

  public requestsInfo: RequestInfo[];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.data.subscribe(data => {
      this.requestsInfo = data.requestsInfo;
      this.requestsInfo.reverse();
    });
  }

  ngOnInit() {
  }

  public showMore(requestId: number) {
    this.router.navigateByUrl(
      `request?requestId=${requestId}`);
  }

  public closeRequest(requestId: number) {
    this.http.get<boolean>(`requests/close/${requestId}`).subscribe(isClosed => {
      if (isClosed) {
        for (const key in this.requestsInfo) {
          if (this.requestsInfo[key].requestId === requestId) {
            this.requestsInfo.splice(+key, 1);
            break;
          }
        }
      }
    });
  }

  public trackByRequestId(index: number, requestInfo: RequestInfo): number {
    return requestInfo.requestId;
  }
}
