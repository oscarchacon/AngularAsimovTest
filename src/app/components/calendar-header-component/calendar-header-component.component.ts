import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'calendar-header-component',
  templateUrl: './calendar-header-component.component.html',
  styleUrls: ['./calendar-header-component.component.css']
})
export class CalendarHeaderComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

}
