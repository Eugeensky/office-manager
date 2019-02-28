import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'projects/shared/src/lib/shared.module';
import { LoginComponent, BuildingComponent } from 'projects/shared/src/public_api';
import { HomeComponent } from './components/home/home.component';
import { FloorsResolveService } from 'projects/shared/src/lib/services/floors-resolve/floors-resolve.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '',
     component: BuildingComponent,
     resolve: {
       floorsInfo: FloorsResolveService
     }
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
