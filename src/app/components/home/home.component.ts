import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendar } from 'primeng/fullcalendar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events: any[];

  public options: any;

  yearNow: number;
  monthNow: number;

  @ViewChild('fc', {static: true}) fc: FullCalendar;

  constructor() { }

  ngOnInit() {
    this.events = [
      {
          "title": "All Day Event",
          "start": "2020-01-01"
      },
      {
          "title": "Long Event",
          "start": "2020-01-07",
          "end": "2020-01-10"
      },
      {
          "title": "Repeating Event",
          "start": "2020-01-09T16:00:00"
      },
      {
          "title": "Repeating Event",
          "start": "2020-01-16T16:00:00"
      },
      {
          "title": "Conference",
          "start": "2020-01-11",
          "end": "2020-01-13"
      }
    ];

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      //defaultDate: '2017-02-01',
      //defaultView: 'timeGridWeek',
      header: {
          right: 'prev,next',
          center: 'title',
          left: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      dateClick: (e) =>  {
        //handle date click
      },
      editable: true,
    };
  }

  handleDateClick(arg) { // handler method
    alert(arg.dateStr);
  }

  gotoDate(date: Date) {
    this.fc.getCalendar().gotoDate(date);
  }
}
