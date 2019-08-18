import { Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { ModalResultQuestion } from './modal-result-question';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'question-modal',
  templateUrl: './question-modal.component.html',
})

export class QuestionModalComponent implements OnInit {
  title: string;
  message: string;
  closeBtnName: string;
  question: string;
  enterText: boolean;
  placeholder: string;
  inputText: string;

  // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/subjects.md
  public says: Subject<ModalResultQuestion>;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.inputText = '';
    this.says = new Subject();
  }

  confirm(): void {
    const response = new ModalResultQuestion();
    response.question = true;
    response.text = this.inputText;
    this.bsModalRef.hide();
    this.says.next(response);
  }

  decline(): void {
    const response = new ModalResultQuestion();
    response.question = false;
    response.text = this.inputText;
    this.bsModalRef.hide();
  }
}


