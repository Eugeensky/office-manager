import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'projects/shared/src/lib/shared.module';
import { LoginComponent, BuildingComponent, FloorComponent, NewRequestComponent } from 'projects/shared/src/public_api';
import { BuildingResolveService } from 'projects/shared/src/lib/services/building-resolve/building-resolve.service';
import { FloorResolveService } from 'projects/shared/src/lib/services/floor-resolve/floor-resolve.service';

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
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
