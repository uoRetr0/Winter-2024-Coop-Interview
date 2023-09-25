import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'congratulations', component: CongratulationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
