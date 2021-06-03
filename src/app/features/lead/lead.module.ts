import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadRoutingModule } from './lead-routing.module';
import { LeadComponent } from './lead.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartComponent } from './chart/chart.component';
import { FilterchartComponent } from './filterchart/filterchart.component';
import { ChartComponent2 } from './chart2/chart2.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{ path: '', component: LeadComponent }];

@NgModule({
  declarations: [
    LeadComponent,
    ChartComponent,
    ChartComponent2,
    FilterchartComponent,
  ],
  imports: [
    CommonModule,
    LeadRoutingModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class LeadModule { }
