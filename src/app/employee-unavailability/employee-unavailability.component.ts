import { Component, OnInit } from '@angular/core';

interface Employee {
  id: number;
  name: string;
  role: string;
}

interface Unavailability {
  employeeId: number;
  date: string; // YYYY-MM-DD
  start: string; // HH:mm
  end: string;   // HH:mm
  reason: string;
}

interface TimeSlotColumn {
  field: string;
  header: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
}

@Component({
  selector: 'app-employee-unavailability',
  templateUrl: './employee-unavailability.component.html',
  styleUrls: ['./employee-unavailability.component.scss']
})
export class EmployeeUnavailabilityComponent implements OnInit {

  employees: Employee[] = [];
  unavailabilityData: Unavailability[] = [];
  dates: Date[] = [];

  // Columns for the table
  timeSlots: TimeSlotColumn[] = [];
  frozenCols: any[] = [{ field: 'name', header: 'Employee' }];

  constructor() { }

  ngOnInit(): void {
    // Determine the dates to show. For now, let's say "Today" and "Tomorrow".
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.dates = [today, tomorrow];

    this.generateTimeSlots();
    this.loadMockData();
  }

  generateTimeSlots() {
    this.timeSlots = [];

    this.dates.forEach(date => {
      const dateStr = this.formatDate(date);
      for (let i = 0; i < 48; i++) { // 24 hours * 2 slots/hour
        const hours = Math.floor(i / 2);
        const minutes = (i % 2) * 30;
        const timeStr = `${this.pad(hours)}:${this.pad(minutes)}`;

        this.timeSlots.push({
          field: `${dateStr}_${timeStr}`,
          header: timeStr,
          date: dateStr,
          time: timeStr
        });
      }
    });
  }

  pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  loadMockData() {
    this.employees = [
      { id: 1, name: 'Alice Johnson', role: 'Developer' },
      { id: 2, name: 'Bob Smith', role: 'Designer' },
      { id: 3, name: 'Charlie Brown', role: 'Manager' },
      { id: 4, name: 'David Lee', role: 'Tester' },
      { id: 5, name: 'Eve White', role: 'Developer' }
    ];

    const todayStr = this.formatDate(new Date());

    this.unavailabilityData = [
      { employeeId: 1, date: todayStr, start: '09:00', end: '10:30', reason: 'Team Meeting' },
      { employeeId: 2, date: todayStr, start: '13:00', end: '14:00', reason: 'Lunch' },
      { employeeId: 3, date: todayStr, start: '10:00', end: '12:00', reason: 'Training' },
      { employeeId: 3, date: todayStr, start: '11:00', end: '11:30', reason: 'Client Call' }, // Overlap
      { employeeId: 1, date: todayStr, start: '15:00', end: '16:00', reason: 'Doctor' },
      { employeeId: 5, date: todayStr, start: '08:00', end: '17:00', reason: 'PTO' },
    ];
  }

  isUnavailable(employee: Employee, col: TimeSlotColumn): boolean {
    // find if there is any unavailability record for this employee on this date
    // that covers this time slot.
    // Logic: record.start <= col.time < record.end

    return this.unavailabilityData.some(u =>
      u.employeeId === employee.id &&
      u.date === col.date &&
      col.time >= u.start && col.time < u.end
    );
  }

  getUnavailabilityReasons(employee: Employee, col: TimeSlotColumn): string {
    const records = this.unavailabilityData.filter(u =>
      u.employeeId === employee.id &&
      u.date === col.date &&
      col.time >= u.start && col.time < u.end
    );

    if (records.length === 0) return '';
    return records.map(r => r.reason).join(', ');
  }

  getCellClass(employee: Employee, col: TimeSlotColumn): string {
    const records = this.unavailabilityData.filter(u =>
      u.employeeId === employee.id &&
      u.date === col.date &&
      col.time >= u.start && col.time < u.end
    );

    if (records.length === 0) return 'available';
    if (records.length > 1) return 'unavailable-multiple';

    const reasonClass = records[0].reason.toLowerCase().replace(/ /g, '-');
    return `unavailable ${reasonClass}`;
  }
}
