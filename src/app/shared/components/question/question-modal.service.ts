import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { QuestionModalComponent } from './question-modal.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionModalService {

  constructor(private modalService: BsModalService) { }

  openModalQuestion(message: string, question: string): BsModalRef {
    const conf = {
      initialState: {
        message,
        question
      },
      class: 'modal-sm',
    };

    return this.modalService.show(QuestionModalComponent, conf);
  }

}
