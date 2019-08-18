import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DeathDate } from 'src/app/core/services/death-date';
import { DeathDateService } from 'src/app/core/services/death-date.service';
import { QuestionModalService } from 'src/app/shared/components/question/question-modal.service';
import { Subscription, Subject } from 'rxjs';
import { UnsusbscribeFunctionsService } from 'src/app/utils/unsusbscribe-functions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-date',
  templateUrl: './modal-date.component.html',
  styleUrls: ['./modal-date.component.css']
})
export class ModalDateComponent implements OnInit, OnDestroy {

  bsModalRefResponde: BsModalRef;

  responseModalFunction: Subscription;
  deleteEventFunction: Subscription;

  loadingRequest: boolean;

  onclose: Subject<boolean>;

  public eventDate: DeathDate;
  public events: DeathDate[] = [];

  constructor(public bsModalRef: BsModalRef,
              private deathDateService: DeathDateService,
              private questionModalService: QuestionModalService,
              private unsubscribeFunction: UnsusbscribeFunctionsService,
              private toastrService: ToastrService) {
    this.loadingRequest = false;
    this.onclose = new Subject();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeFunction.unsubscribeSubscription(this.responseModalFunction);
    this.unsubscribeFunction.unsubscribeSubscription(this.deleteEventFunction);
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  deleteEventDate(deathDate: DeathDate): void {
    this.bsModalRefResponde = this.questionModalService.openModalQuestion("Delete this Event", "Are you sure?");
    this.responseModalFunction = this.bsModalRefResponde.content.says.subscribe((response: any) => {
      if (response) {
        this.loadingRequest = true;
        this.deleteEventFunction = this.deathDateService
                                        .deleteDate(deathDate)
                                        .subscribe((response: any) => {
                                          this.loadingRequest = false;
                                          this.toastrService.success(`Event removed`, `success`, {
                                            closeButton: true,
                                            timeOut: 2000,
                                          });
                                          this.events = this.events.filter(deathDateObj => deathDateObj != deathDate);
                                          this.onclose.next(true);
                                          this.closeModal();
                                        }, error => {
                                          this.loadingRequest = false;
                                          this.toastrService.error(`Cannot delete event, message: ${error}`, `Error`, {
                                            closeButton: true,
                                            timeOut: 2000,
                                          });
                                        });
      }
    });
  }

}
