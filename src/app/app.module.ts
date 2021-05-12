import { ChartComponent2 } from './lead/chart2/chart2.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeadComponent } from './lead/lead.component';
import { EvaluatorComponent } from './evaluator/evaluator.component';
import { RMGComponent } from './rmg/rmg.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { ToasterModule } from 'angular2-toaster';
import { ChartComponent } from './lead/chart/chart.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterchartComponent } from './lead/filterchart/filterchart.component';

@NgModule({
  declarations: [
    AppComponent,
    LeadComponent,
    EvaluatorComponent,
    RMGComponent,
    NavComponent,
    ChartComponent,
    ChartComponent2,
    FilterchartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ToasterModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
