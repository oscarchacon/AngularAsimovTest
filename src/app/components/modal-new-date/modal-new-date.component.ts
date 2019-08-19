import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DeathDate } from 'src/app/core/services/death-date';
import { BsModalRef } from 'ngx-bootstrap';
import { DeathDateService } from 'src/app/core/services/death-date.service';
import { ToastrService } from 'ngx-toastr';
import { QuestionModalService } from 'src/app/shared/components/question/question-modal.service';
import { UnsusbscribeFunctionsService } from 'src/app/utils/unsusbscribe-functions.service';

@Component({
  selector: 'app-modal-new-date',
  templateUrl: './modal-new-date.component.html',
  styleUrls: ['./modal-new-date.component.css']
})
export class ModalNewDateComponent implements OnInit, OnDestroy {

  public eventDate: DeathDate = {};
  public events: DeathDate[] = [];

  refresh: Subject<any> = new Subject();
  onclose: Subject<boolean>;

  saveDateFunction: Subscription;
  responseModalFunction: Subscription;

  loadingRequest: boolean;
  bsModalRefResponde: BsModalRef;

  constructor(public bsModalRef: BsModalRef,
              private toastrService: ToastrService,
              private deathDateService: DeathDateService,
              private questionModalService: QuestionModalService,
              private unsubscribeFunction: UnsusbscribeFunctionsService) {
    this.eventDate.start = new Date();
    this.eventDate.end = new Date();
    this.onclose = new Subject();
    this.loadingRequest = false;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeFunction.unsubscribeSubscription(this.saveDateFunction);
    this.unsubscribeFunction.unsubscribeSubscription(this.responseModalFunction);
  }

  checkDate(deathDate: DeathDate): boolean {
    if ((deathDate.start != null && deathDate.start !== undefined)) {
      if (deathDate.start.getDay() == 0 || deathDate.start.getDay() == 6) {
        this.toastrService.error(`The start of the event must be between Monday to Friday`, `Error`, {
          closeButton: true,
          timeOut: 2000,
        });
        return false;
      }
      if ((deathDate.start.getHours() < 9)) {
        this.toastrService.error(`The start of the event must be between to 9:00 to 18:00`, `Error`, {
          closeButton: true,
          timeOut: 2000,
        });
        return false;
      }
      if ((deathDate.start.getHours() >= 18 && deathDate.start.getMinutes() > 0)) {
        this.toastrService.error(`The start of the event must be between to 9:00 to 18:00`, `Error`, {
          closeButton: true,
          timeOut: 2000,
        });
        return false;
      }
    }
    if ((deathDate.end != null && deathDate.end !== undefined)) {
      if (deathDate.end.getDay() == 0 || deathDate.end.getDay() == 6) {
        this.toastrService.error(`The end of the event must be between Monday to Friday`, `Error`, {
          closeButton: true,
          timeOut: 2000,
        });
        return false;
      }
      if ((deathDate.end.getHours() < 9)) {
        this.toastrService.error(`The end of the event must be between to 9:00 to 18:00`, `Error`, {
          closeButton: true,
          timeOut: 2000,
        });
        return false;
      }
      if ((deathDate.end.getHours() >= 18 && deathDate.end.getMinutes() > 0)) {
        this.toastrService.error(`The end of the event must be between to 9:00 to 18:00`, `Error`, {
          closeButton: true,
          timeOut: 2000,
        });
        return false;
      }
    }

    if ((deathDate.start != null && deathDate.start !== undefined) && (deathDate.end != null && deathDate.end !== undefined)) {
      if (deathDate.start > deathDate.end) {
        this.toastrService.error(`The start of the event is greater than the end Or The end of the event is less than the start`, `Error`, {
          closeButton: true,
          timeOut: 2000,
        });
        return false;
      }

      let difference = Math.abs(deathDate.end.getTime() - deathDate.start.getTime());
      let resultsInMinutes = Math.round(difference/60000);

      if (resultsInMinutes > 60) {
        this.toastrService.error(`The event must not be longer than 60 minutes`, `Error`, {
          closeButton: true,
          timeOut: 2000,
        });
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  checkDataForSave(deathDate: DeathDate): boolean {
    if (deathDate.start == null || deathDate.start == undefined) {
      this.toastrService.error(`The event must have a start`, `Error`, {
        closeButton: true,
        timeOut: 2000,
      });
      return false;
    }

    if (deathDate.end == null || deathDate.end == undefined) {
      this.toastrService.error(`The event must have a end`, `Error`, {
        closeButton: true,
        timeOut: 2000,
      });
      return false;
    }

    if (!this.checkDate(deathDate)) {
      return false;
    }
    if (deathDate.title == null || deathDate.title === '') {
      this.toastrService.error(`The event must have a title`, `Error`, {
        closeButton: true,
        timeOut: 2000,
      });
      return false;
    }

    if (deathDate.contactEmail == null || deathDate.contactEmail === '') {
      this.toastrService.error(`The event must have a Contact Email`, `Error`, {
        closeButton: true,
        timeOut: 2000,
      });
      return false;
    }
    return true;
  }

  saveDeathDate(deathDate: DeathDate): void {
    if (this.checkDataForSave(deathDate)) {
      this.bsModalRefResponde = this.questionModalService.openModalQuestion("Save new Event", "Are you sure?");
      this.responseModalFunction = this.bsModalRefResponde.content.says.subscribe((response: any) => {
        if(response) {
          this.loadingRequest = true;
          this.saveDateFunction = this.deathDateService
                                      .saveNewDate(deathDate)
                                      .subscribe((response: any) => {
                                        if (response != null) {
                                          this.eventDate = response;
                                          this.eventDate.start = new Date(this.eventDate.start);
                                          this.eventDate.end = new Date(this.eventDate.end);
                                          this.events.push(this.eventDate);
                                          this.onclose.next(true);
                                        }
                                        this.loadingRequest = false;
                                        this.toastrService.success(`The event was created`, `Success`, {
                                          closeButton: true,
                                          timeOut: 2000,
                                        });
                                        this.closeModal();
                                      }, error => {
                                        this.toastrService.error(`Cannot save the event, message: ${error}`, `Error`, {
                                          closeButton: true,
                                          timeOut: 2000,
                                        });
                                        this.loadingRequest = false;
                                      });
        }
      });
    }
  }


  closeModal(): void {
    this.bsModalRef.hide();
  }
}
