import { EvaluatorComponent } from './evaluator/evaluator.component';
import { LeadComponent } from './lead/lead.component';
import { RMGComponent } from './rmg/rmg.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", component:LeadComponent},
  {path: "rmg", component: RMGComponent},
  {path: "lead", component: LeadComponent},
  {path: "lead/:date", component: LeadComponent},
  {path: "evaluate", component: EvaluatorComponent},
  {path: "evaluate/:id", component: EvaluatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
