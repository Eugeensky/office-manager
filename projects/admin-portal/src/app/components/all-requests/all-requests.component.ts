import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestInfo } from 'projects/shared/src/public_api';
import { RequestStatus } from 'projects/shared/src/lib/models/request-status';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})
export class AllRequestsComponent implements OnInit {

  public requestsInfo: RequestInfo[];
  public RequestStatus = RequestStatus;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.data.subscribe(data => {
      this.requestsInfo = data.requestsInfo;
      this.requestsInfo.sort((x, y) => {
        if (x.postDate < y.postDate) {
          return 1;
        } else {
          return -1;
        }
      });
    });
  }

  ngOnInit() {
  }

  public showMore(requestId: number) {
    this.router.navigateByUrl(
      `request?requestId=${requestId}`);
  }
}
