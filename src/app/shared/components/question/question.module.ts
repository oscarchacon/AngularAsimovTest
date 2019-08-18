import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionModalComponent } from './question-modal.component';
import { QuestionButtonComponent } from './question-button.component';
import { BsModalService,  } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { QuestionModalService } from './question-modal.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    QuestionModalComponent,
    QuestionButtonComponent
  ],
  providers: [
    BsModalService,
    QuestionModalService,
  ],
  entryComponents: [
    QuestionModalComponent
  ],
  /*exports: [
    QuestionModalComponent,
    QuestionButtonComponent
  ]*/
})
export class QuestionModule { }
