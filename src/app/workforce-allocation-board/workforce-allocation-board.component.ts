import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleComponent, EventSettingsModel, GroupModel, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService, TimeScaleModel } from '@syncfusion/ej2-angular-schedule';
import { WorkforceAllocationService } from '../core/services/workforce-allocation.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-workforce-allocation-board',
  templateUrl: './workforce-allocation-board.component.html',
  styleUrls: ['./workforce-allocation-board.component.scss'],
  providers: [TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService]
})
export class WorkforceAllocationBoardComponent implements OnInit {

  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;

  public selectedDate: Date = new Date();
  public currentView: string = 'TimelineDay';
  public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 2 };
  public group: GroupModel = {
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
      employees: this.allocationService.getEmployees(),
      allocations: this.allocationService.getAllocations(),
      unavailabilities: this.allocationService.getUnavailabilities()
    }).subscribe(({ employees, allocations, unavailabilities }) => {

      this.employeeDataSource = employees.map(e => ({
        Id: e.Id,
        Name: e.Name,
        Role: e.Role,
        Color: e.Color
      }));

      const allEvents = [
        ...allocations.map(a => ({
          Id: a.Id,
          Subject: a.Subject,
          StartTime: a.StartTime,
          EndTime: a.EndTime,
          EmployeeId: a.EmployeeId,
          IsAllDay: a.IsAllDay,
          Description: a.Description
        })),
        ...unavailabilities.map(u => ({
          Id: u.Id,
          Subject: u.Subject,
          StartTime: u.StartTime,
          EndTime: u.EndTime,
          EmployeeId: u.EmployeeId,
          IsAllDay: u.IsAllDay,
          IsBlock: u.IsBlock
        }))
      ];

      this.eventSettings = {
        dataSource: allEvents
      };
    });
  }
}
