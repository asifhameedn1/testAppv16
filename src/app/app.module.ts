import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ComboBoxModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { BadgeModule } from 'primeng/badge';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeUnavailabilityComponent } from './employee-unavailability/employee-unavailability.component';
import { AddUnavailabilityComponent } from './add-unavailability/add-unavailability.component';
import { WorkforceAllocationBoardComponent } from './workforce-allocation-board/workforce-allocation-board.component';
import { DailyAvailabilityComponent } from './daily-availability/daily-availability.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeUnavailabilityComponent,
    AddUnavailabilityComponent,
    WorkforceAllocationBoardComponent,
    DailyAvailabilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    ButtonModule,
    DropDownListModule,
    ComboBoxModule,
    ScheduleModule,
    BadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
