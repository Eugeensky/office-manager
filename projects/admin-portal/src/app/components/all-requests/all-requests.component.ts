import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestInfo } from 'projects/shared/src/public_api';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})
export class AllRequestsComponent implements OnInit {

  public requestsInfo: RequestInfo[];

  constructor(private route: ActivatedRoute, private router: Router) {
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
}
