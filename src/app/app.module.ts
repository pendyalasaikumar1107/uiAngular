import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LeadComponent } from './lead/lead.component';
import { ChartComponent2 } from './lead/chart2/chart2.component';
import { EvaluatorComponent } from './evaluator/evaluator.component';
import { RMGComponent } from './rmg/rmg.component';
import { NavComponent } from './nav/nav.component';
import { ChartComponent } from './lead/chart/chart.component';
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
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:2000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
