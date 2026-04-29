import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleComponent, EventSettingsModel, GroupModel, TimelineViewsService, ResizeService, DragAndDropService, TimeScaleModel, EventRenderedArgs, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { WorkforceAllocationService } from '../core/services/workforce-allocation.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-daily-availability',
  templateUrl: './daily-availability.component.html',
  styleUrls: ['./daily-availability.component.scss'],
  providers: [TimelineViewsService, ResizeService, DragAndDropService]
})
export class DailyAvailabilityComponent implements OnInit {

  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;

  public selectedDate: Date = new Date();
  public currentView: string = 'TimelineDay';
  public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 1 };
  
  public group: GroupModel = {
    enableCompactView: false,
    resources: ['Employees']
  };

  public eventSettings: EventSettingsModel = {
    dataSource: []
  };

  public employeeDataSource: Object[] = [];

  constructor(private allocationService: WorkforceAllocationService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    forkJoin({
      employees: this.allocationService.getEmployeeLight(),
      unavailabilities: this.allocationService.getEmployeeUnavailabilities()
    }).subscribe(({ employees, unavailabilities }) => {

      // Map EmployeeLight to Resource dataSource format
      this.employeeDataSource = employees.map(e => ({
        Id: e.employeeId,
        Name: e.employeeName,
        Color: this.getRandomColor(e.employeeId) // Fallback color since EmployeeLight doesn't have one
      }));

      // Map EmployeeUnavailability to Event dataSource format
      const eventsData = unavailabilities.map(u => ({
        Id: u.id,
        Subject: u.reason,
        StartTime: u.startTime,
        EndTime: u.endTime,
        EmployeeId: u.employeeId,
        IsBlock: u.isBlock,
        Color: u.colorCode,
        ReasonCode: u.reasonCode
      }));

      this.eventSettings = {
        dataSource: eventsData,
        fields: {
          id: 'Id',
          subject: { name: 'Subject' },
          startTime: { name: 'StartTime' },
          endTime: { name: 'EndTime' }
        }
      };
    });
  }

  public getEventStyle(data: any): Record<string, string> {
    // Left for backwards compatibility or inner styling if needed
    return {};
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const color: string = args.data['Color'] as string;
    if (color && args.element) {
      args.element.style.backgroundColor = color;
    }
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'EventContainer') {
      const eventData = (args.data as any)?.event as any[];
      if (eventData && eventData.length > 0) {
        setTimeout(() => {
          const events = args.element.querySelectorAll('.e-appointment');
          if (events && events.length === eventData.length) {
            events.forEach((ele: Element, index: number) => {
              const htmlEle = ele as HTMLElement;
              const color = eventData[index]?.Color;
              if (color) {
                htmlEle.style.setProperty('background-color', color, 'important');
              }
            });
          } else {
            // Fallback matching by subject
            events.forEach((ele: Element) => {
              const htmlEle = ele as HTMLElement;
              const subjectEle = htmlEle.querySelector('.e-subject');
              if (subjectEle && subjectEle.textContent) {
                const subjectText = subjectEle.textContent.trim();
                const matchedEvent = eventData.find(e => e.Subject === subjectText);
                if (matchedEvent && matchedEvent.Color) {
                  htmlEle.style.setProperty('background-color', matchedEvent.Color, 'important');
                }
              }
            });
          }
        });
      }
    }
  }

  // Utility to give some color to the resources if needed
  private getRandomColor(id: number): string {
    const colors = ['#ea7a57', '#7fa900', '#5978ee', '#fec200', '#df5286', '#00bdae'];
    return colors[id % colors.length];
  }
}
