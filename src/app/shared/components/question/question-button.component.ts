import { Component, OnInit, Output, EventEmitter, Input, HostListener, ElementRef } from '@angular/core';
import { QuestionModalComponent } from './question-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalResultQuestion } from './modal-result-question';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[appQuestionButton]',
  template: `
    <i class="fa {{faIcon}}" aria-hidden="true" [class.fa-spinner-spin]="loading"></i> {{label}}`,
  styles: []
})
export class QuestionButtonComponent implements OnInit {
  validateLoading = false;

  @Input('loading')
  set loading(value: boolean){
    // tslint:disable-next-line: triple-equals
    if (value != this.validateLoading) {
      this.validateLoading = value;
      this.elRef.nativeElement.disabled = this.validateLoading;
      this.loadingChange.emit(this.validateLoading);
    }
  }
  get loading(): boolean {
    return this.validateLoading;
  }

  @Output()
  loadingChange = new EventEmitter<boolean>();

  @Input() label: string;
  @Input() faIcon = 'fas fa-save';
  @Input() title: string;
  @Input() enterText: boolean;
  @Input() message: string;
  // tslint:disable-next-line: no-inferrable-types
  @Input() textPlaceholder: string = 'Indique un comentario...';
  @Output() responseEvent = new EventEmitter<ModalResultQuestion>();

  bsModalRef: BsModalRef;

  @HostListener('click')
  showQuestion(): void {
    const conf = {
      initialState: {
        title: this.title,
        message: this.message,
        enterText: this.enterText,
        placeholder: this.textPlaceholder
      },
      class: 'modal-sm',
      keyboard: false,
      ignoreBackdropClick: true
    };
    this.bsModalRef = this.modalService.show(QuestionModalComponent, conf);
    this.bsModalRef.content.says.subscribe((x: any) => {
      if (x.question) {
        this.loading = true;
      }
      this.responseEvent.emit(x);
    });
  }

  constructor(private modalService: BsModalService,
              private elRef: ElementRef) { }

  ngOnInit() {}
}
