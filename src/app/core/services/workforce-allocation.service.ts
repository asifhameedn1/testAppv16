import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee, EmployeeGroup, AllocationEvent, EmployeeUnavailability, EmployeeLight } from '../models/workforce-allocation.model';

@Injectable({
  providedIn: 'root'
})
export class WorkforceAllocationService {

  constructor() { }

  getEmployeeGroups(): Observable<EmployeeGroup[]> {
    const groups: EmployeeGroup[] = [
      { GroupId: 1, GroupName: 'Engineering' },
      { GroupId: 2, GroupName: 'Design' },
      { GroupId: 3, GroupName: 'Management' }
    ];
    return of(groups);
  }

  getEmployees(): Observable<Employee[]> {
    const employees: Employee[] = [
      { Id: 1, Name: 'Alice Smith', Role: 'Frontend Dev', Color: '#ea7a57', GroupId: 1 },
      { Id: 2, Name: 'Bob Jones', Role: 'Backend Dev', Color: '#7fa900', GroupId: 1 },
      { Id: 3, Name: 'Charlie Brown', Role: 'UI Designer', Color: '#5978ee', GroupId: 2 },
      { Id: 4, Name: 'Diana Prince', Role: 'UX Researcher', Color: '#fec200', GroupId: 2 },
      { Id: 5, Name: 'Eve Davis', Role: 'Project Manager', Color: '#df5286', GroupId: 3 }
    ];
    return of(employees);
  }

  getAllocations(): Observable<AllocationEvent[]> {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const allocations: AllocationEvent[] = [
      {
        Id: 1,
        Subject: 'Project Alpha - UI Update',
        StartTime: new Date(currentYear, currentMonth, today.getDate() - 2, 9, 0),
        EndTime: new Date(currentYear, currentMonth, today.getDate() + 2, 17, 0),
        EmployeeId: 1,
        IsAllDay: true,
        Description: 'Update the main dashboard UI.'
      },
      {
        Id: 2,
        Subject: 'API Development',
        StartTime: new Date(currentYear, currentMonth, today.getDate(), 10, 0),
        EndTime: new Date(currentYear, currentMonth, today.getDate() + 5, 18, 0),
        EmployeeId: 2,
        IsAllDay: true,
        Description: 'Develop new endpoints for v2 API.'
      },
      {
        Id: 3,
        Subject: 'Wireframing',
        StartTime: new Date(currentYear, currentMonth, today.getDate() - 5, 9, 0),
        EndTime: new Date(currentYear, currentMonth, today.getDate(), 17, 0),
        EmployeeId: 3,
        IsAllDay: true,
        Description: 'Create wireframes for the new mobile app.'
      },
      {
        Id: 4,
        Subject: 'User Testing',
        StartTime: new Date(currentYear, currentMonth, today.getDate() + 1, 9, 0),
        EndTime: new Date(currentYear, currentMonth, today.getDate() + 3, 17, 0),
        EmployeeId: 4,
        IsAllDay: true,
        Description: 'Conduct user testing sessions.'
      },
      {
        Id: 5,
        Subject: 'Sprint Planning',
        StartTime: new Date(currentYear, currentMonth, today.getDate(), 10, 0),
        EndTime: new Date(currentYear, currentMonth, today.getDate(), 12, 0),
        EmployeeId: 5,
        IsAllDay: false,
        Description: 'Plan the next sprint.'
      }
    ];
    return of(allocations);
  }

  getUnavailabilities(): Observable<AllocationEvent[]> {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Creating some mock unavailability blocked events
    const unavailabilities: AllocationEvent[] = [
      {
        Id: 101,
        Subject: 'Team Meeting',
        StartTime: new Date(currentYear, currentMonth, today.getDate(), 9, 0),
        EndTime: new Date(currentYear, currentMonth, today.getDate(), 10, 30),
        EmployeeId: 1,
        IsBlock: true
      },
      {
        Id: 102,
        Subject: 'Lunch',
        StartTime: new Date(currentYear, currentMonth, today.getDate(), 13, 0),
        EndTime: new Date(currentYear, currentMonth, today.getDate(), 14, 0),
        EmployeeId: 2,
        IsBlock: true
      },
      {
        Id: 103,
        Subject: 'Training',
        StartTime: new Date(currentYear, currentMonth, today.getDate(), 10, 0),
        EndTime: new Date(currentYear, currentMonth, today.getDate(), 12, 0),
        EmployeeId: 3,
        IsBlock: true
      },
      {
        Id: 104,
        Subject: 'Doctor',
        StartTime: new Date(currentYear, currentMonth, today.getDate(), 15, 0),
        EndTime: new Date(currentYear, currentMonth, today.getDate(), 16, 0),
        EmployeeId: 1,
        IsBlock: true
      },
      {
        Id: 105,
        Subject: 'PTO',
        StartTime: new Date(currentYear, currentMonth, today.getDate() + 1, 8, 0),
        EndTime: new Date(currentYear, currentMonth, today.getDate() + 1, 17, 0),
        EmployeeId: 5,
        IsBlock: true,
        IsAllDay: true
      },
      {
        Id: 106,
        Subject: 'Planning',
        StartTime: new Date(currentYear, currentMonth, today.getDate(), 11, 0),
        EndTime: new Date(currentYear, currentMonth, today.getDate(), 14, 0),
        EmployeeId: 3,
        IsBlock: true
      }
    ];

    return of(unavailabilities);
  }

  getEmployeeUnavailabilities(): Observable<EmployeeUnavailability[]> {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const unavailabilities: EmployeeUnavailability[] = [
      {
        id: '101',
        startTime: new Date(currentYear, currentMonth, today.getDate(), 9, 0),
        endTime: new Date(currentYear, currentMonth, today.getDate(), 10, 30),
        employeeId: 1,
        unavailabilityId: 101,
        reason: 'Team Meeting',
        reasonCode: 'MEETING',
        isBlock: false,
        colorCode: '#ea7a57'
      },
      {
        id: '102',
        startTime: new Date(currentYear, currentMonth, today.getDate(), 13, 0),
        endTime: new Date(currentYear, currentMonth, today.getDate(), 14, 0),
        employeeId: 2,
        unavailabilityId: 102,
        reason: 'Lunch',
        reasonCode: 'LUNCH',
        isBlock: false,
        colorCode: '#7fa900'
      },
      {
        id: '103',
        startTime: new Date(currentYear, currentMonth, today.getDate(), 10, 0),
        endTime: new Date(currentYear, currentMonth, today.getDate(), 12, 0),
        employeeId: 3,
        unavailabilityId: 103,
        reason: 'Training',
        reasonCode: 'TRAINING',
        isBlock: false,
        colorCode: '#5978ee'
      },
      {
        id: '104',
        startTime: new Date(currentYear, currentMonth, today.getDate(), 15, 0),
        endTime: new Date(currentYear, currentMonth, today.getDate(), 16, 0),
        employeeId: 1,
        unavailabilityId: 104,
        reason: 'Doctor',
        reasonCode: 'DOCTOR',
        isBlock: false,
        colorCode: '#df5286'
      },
      {
        id: '105',
        startTime: new Date(currentYear, currentMonth, today.getDate() + 1, 8, 0),
        endTime: new Date(currentYear, currentMonth, today.getDate() + 1, 17, 0),
        employeeId: 5,
        unavailabilityId: 105,
        reason: 'PTO',
        reasonCode: 'PTO',
        isBlock: false,
        colorCode: '#fec200'
      },
      {
        id: '106',
        startTime: new Date(currentYear, currentMonth, today.getDate(), 11, 0),
        endTime: new Date(currentYear, currentMonth, today.getDate(), 14, 0),
        employeeId: 3,
        unavailabilityId: 106,
        reason: 'Planning',
        reasonCode: 'PLANNING',
        isBlock: false,
        colorCode: '#00bdae'
      },
      {
        id: '107',
        startTime: new Date(currentYear, currentMonth, today.getDate(), 11, 0),
        endTime: new Date(currentYear, currentMonth, today.getDate(), 16, 0),
        employeeId: 3,
        unavailabilityId: 107,
        reason: 'Leave',
        reasonCode: 'LEAVE',
        isBlock: false,
        colorCode: '#770808ff'
      },
      {
        id: '108',
        startTime: new Date(currentYear, currentMonth, today.getDate(), 22, 0),
        endTime: new Date(currentYear, currentMonth, today.getDate() + 1, 2, 0),
        employeeId: 3,
        unavailabilityId: 108,
        reason: 'Planning',
        reasonCode: 'PLANNING',
        isBlock: false,
        colorCode: '#00bdae'
      }
    ];

    return of(unavailabilities);
  }

  getEmployeeLight(): Observable<EmployeeLight[]> {
    const employees: EmployeeLight[] = [
      { employeeId: 1, employeeName: 'Alice Smith' },
      { employeeId: 2, employeeName: 'Bob Jones' },
      { employeeId: 3, employeeName: 'Charlie Brown' },
      { employeeId: 4, employeeName: 'Diana Prince' },
      { employeeId: 5, employeeName: 'Eve Davis' }
    ];
    return of(employees);
  }
}
