import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendar } from 'primeng/fullcalendar';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { DeathDate } from 'src/app/core/services/death-date';
import { DeathDateService } from 'src/app/core/services/death-date.service';
import { UnsusbscribeFunctionsService } from 'src/app/utils/unsusbscribe-functions.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDateComponent } from '../modal-date/modal-date.component';
import { ModalNewDateComponent } from '../modal-new-date/modal-new-date.component';

@Component({
  selector: 'app-home',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  view: string = 'week';

  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  startOfWeek: number;

  loadingEvents: boolean;

  events: DeathDate[] = [];

  public options: any;

  yearNow: number;
  monthNow: number;

  getDeathDateFunction: Subscription;
  responseModalFunction: Subscription;

  bsModalRef: BsModalRef;

  @ViewChild('fc', {static: true}) fc: FullCalendar;

  constructor(private deathDateService: DeathDateService,
              private unsubscribeService: UnsusbscribeFunctionsService,
              private toastrService: ToastrService,
              private modalService: BsModalService) {
    this.loadingEvents = false;
    const today = new Date();
    this.yearNow = today.getFullYear();
    this.monthNow = today.getMonth()+1;
    this.startOfWeek = 1;
  }

  ngOnInit() {
    this.getDeathDates(this.yearNow, this.monthNow);
  }

  ngOnDestroy() {
    this.unsubscribeService.unsubscribeSubscription(this.getDeathDateFunction);
    this.unsubscribeService.unsubscribeSubscription(this.responseModalFunction);
  }

  getDeathDates(year?: number, month?: number): void {
    this.loadingEvents = true;
    this.getDeathDateFunction = this.deathDateService
                                    .getAllDates(year, month)
                                    .subscribe((response: any) => {
                                      this.events = response;
                                      if(this.events != null && this.events.length > 0){
                                        this.events.forEach(deathDate => {
                                          deathDate.end = new Date(deathDate.end);
                                          deathDate.start = new Date(deathDate.start);
                                        });
                                      }
                                      this.loadingEvents = false;
                                    }, error => {
                                      this.toastrService.error(`Not loading Dates: ${error}`, `Error`, {
                                        closeButton: true,
                                        timeOut: 2000,
                                      });
                                      this.loadingEvents = false;
                                    });
  }

  fetchEvents(event): void {
    if (event instanceof Date) {
      const month = event.getMonth()+1;
      const year = event.getFullYear();
      if (year != this.yearNow || month != this.monthNow) {
        this.yearNow = year;
        this.monthNow = month;
        this.getDeathDates(this.yearNow, this.monthNow);
      }
    }
  }

  dayClicked(event): void {

  }

  eventClicked(event): void {
    const conf = {
      initialState: {
        eventDate: event,
        events: this.events
      },
      class: 'modal-md'
    };

    this.bsModalRef = this.modalService.show(ModalDateComponent, conf);
    this.responseModalFunction = this.bsModalRef.content.onclose.subscribe((response: any) => {
      if (response) {
        this.getDeathDates(this.yearNow, this.monthNow);
      }
    });
  }

  openModalNewEvent(): void {
    const conf = {
      initialState: {
        eventDate: {} as any,
        events: this.events
      },
      class: 'modal-md'
    };

    this.bsModalRef = this.modalService.show(ModalNewDateComponent, conf);
    this.responseModalFunction = this.bsModalRef.content.onclose.subscribe((response: any) => {
      if (response) {
        this.getDeathDates(this.yearNow, this.monthNow);
      }
    });
  }
}
