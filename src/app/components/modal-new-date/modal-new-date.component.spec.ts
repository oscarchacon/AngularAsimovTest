import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewDateComponent } from './modal-new-date.component';

describe('ModalNewDateComponent', () => {
  let component: ModalNewDateComponent;
  let fixture: ComponentFixture<ModalNewDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
