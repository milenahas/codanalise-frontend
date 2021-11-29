import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModalComponent } from '../pages/form-modal/form-modal.component';

@NgModule({
  declarations: [
    FormModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormModalComponent
  ],
})
export class SharedModule { }
