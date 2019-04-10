import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'projects/shared/src/lib/shared.module';
import { LoginComponent, BuildingComponent } from 'projects/shared/src/public_api';
import { FloorComponent } from './components/floor/floor.component';
import { RoomComponent } from './components/room/room.component';
import { BuildingResolveService } from 'projects/shared/src/lib/services/building-resolve/building-resolve.service';
import { FloorResolveService } from 'projects/shared/src/lib/services/floor-resolve/floor-resolve.service';
import { RoomResolveService } from 'projects/shared/src/lib/services/room-resolve/room-resolve.service';
import { RequestResolveService } from 'projects/shared/src/lib/services/request-resolve/request-resolve.service';
import { RequestComponent } from './components/request/request.component';
import { AllRequestsComponent } from './components/all-requests/all-requests.component';
import { AllRequestsResolve } from 'projects/shared/src/lib/services/all-requests-resolve/all-requests-resolve.service';
import { OfficeConstructorComponent } from './components/office-constructor/office-constructor.component';
import { NewFloorComponent } from './components/office-constructor/new-floor/new-floor.component';
import { EditFloorComponent } from './components/office-constructor/edit-floor/edit-floor.component';
import { ConstructorResolveService } from './services/constructor-resolve/constructor-resolve.service';

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
  {
    path: 'allRequests',
    component: AllRequestsComponent,
    resolve: {
      requestsInfo: AllRequestsResolve
    }
  },
  {
    path: 'constructor',
    component: OfficeConstructorComponent,
    resolve : {
      floorNumbers: ConstructorResolveService
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
