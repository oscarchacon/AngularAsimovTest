import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
//import { FullCalendarModule } from '@fullcalendar/angular';
import { HomeComponent } from './components/home/home.component';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { FullCalendarModule } from 'primeng/fullcalendar';     //accordion and accordion tab
import { ButtonModule } from 'primeng/button';
import { CalendarHeaderComponentComponent } from './components/calendar-header-component/calendar-header-component.component';
import { UtilsModule } from './utils/utils.module';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalDateComponent } from './components/modal-date/modal-date.component';
import { QuestionModule } from './shared/components/question/question.module';
import { ModalNewDateComponent } from './components/modal-new-date/modal-new-date.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalendarHeaderComponentComponent,
    ModalDateComponent,
    ModalNewDateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule,
    CoreModule,
    FullCalendarModule,
    AccordionModule,
    ButtonModule,
    UtilsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    QuestionModule,
  ],
  entryComponents: [
    ModalDateComponent,
    ModalNewDateComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
