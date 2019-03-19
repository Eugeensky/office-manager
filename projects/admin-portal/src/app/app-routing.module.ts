import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'projects/shared/src/lib/shared.module';
import { LoginComponent, BuildingComponent, FloorComponent, NewRequestComponent, RoomComponent } from 'projects/shared/src/public_api';
import { BuildingResolveService } from 'projects/shared/src/lib/services/building-resolve/building-resolve.service';
import { FloorResolveService } from 'projects/shared/src/lib/services/floor-resolve/floor-resolve.service';
import { RoomResolveService } from 'projects/shared/src/lib/services/room-resolve/room-resolve.service';
import { RequestResolveService } from 'projects/shared/src/lib/services/request-resolve/request-resolve.service';
import { RequestComponent } from './components/request/request.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '',
     component: BuildingComponent,
     resolve: {
       floorsInfo: BuildingResolveService
     }
  },
  {
    path: 'floors/:floorNumber',
    component: FloorComponent,
    resolve: {
      roomsInfo: FloorResolveService
    }
  },
  {
    path: 'newRequest',
    component: NewRequestComponent
  },
  {
    path: 'rooms',
    component: RoomComponent,
    resolve: {
      requestsInfo: RoomResolveService
    }
  },
  {
    path: 'request',
    component: RequestComponent,
    resolve: {
      requestInfo: RequestResolveService
    }
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
