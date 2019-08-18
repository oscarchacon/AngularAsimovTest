import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHeaderComponentComponent } from './calendar-header-component.component';

describe('CalendarHeaderComponentComponent', () => {
  let component: CalendarHeaderComponentComponent;
  let fixture: ComponentFixture<CalendarHeaderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarHeaderComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarHeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
