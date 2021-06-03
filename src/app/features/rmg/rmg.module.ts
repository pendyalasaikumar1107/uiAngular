import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RmgRoutingModule } from './rmg-routing.module';
import { RMGComponent } from './rmg.component';


@NgModule({
  declarations: [
    RMGComponent,
  ],
  imports: [
    CommonModule,
    RmgRoutingModule,
    FormsModule
  ]
})
export class RmgModule { }
