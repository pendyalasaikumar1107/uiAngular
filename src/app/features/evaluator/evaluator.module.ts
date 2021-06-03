import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluatorRoutingModule } from './evaluator-routing.module';
import { EvaluatorComponent } from './evaluator.component';


@NgModule({
  declarations: [
    EvaluatorComponent,
  ],
  imports: [
    CommonModule,
    EvaluatorRoutingModule
  ]
})
export class EvaluatorModule { }
