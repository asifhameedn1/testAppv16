export interface Employee {
  Id: number;
  Name: string;
  Role: string;
  Color: string;
  GroupId: number;
}

export interface EmployeeGroup {
  GroupId: number;
  GroupName: string;
}

export interface AllocationEvent {
  Id: number;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  EmployeeId: number;
  IsAllDay?: boolean;
  Description?: string;
  IsBlock?: boolean;
}

export interface EmployeeUnavailability {
  id: string;
  startTime: Date;
  endTime: Date;
  employeeId: number;
  unavailabilityId: number;
  reason: string;
  reasonCode: string;
  isBlock: boolean;
  colorCode: string;
}

export interface EmployeeLight {
  employeeId: number;
  employeeName: string;
}