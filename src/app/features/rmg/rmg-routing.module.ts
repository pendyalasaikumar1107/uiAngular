import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RMGComponent } from './rmg.component';

const routes: Routes = [{ path: '', component: RMGComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmgRoutingModule { }
