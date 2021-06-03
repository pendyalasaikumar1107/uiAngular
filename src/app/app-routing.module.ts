import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'lead', loadChildren: () => import('./features/lead/lead.module').then(m => m.LeadModule) },
  { path: '', component: HomeComponent },
  { path: 'lead/:date', loadChildren: () => import('./features/lead/lead.module').then(m => m.LeadModule) },
  { path: 'rmg', loadChildren: () => import('./features/rmg/rmg.module').then(m => m.RmgModule) },
  { path: 'evaluator', loadChildren: () => import('./features/evaluator/evaluator.module').then(m => m.EvaluatorModule) },
  { path: 'evaluator/:id', loadChildren: () => import('./features/evaluator/evaluator.module').then(m => m.EvaluatorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
