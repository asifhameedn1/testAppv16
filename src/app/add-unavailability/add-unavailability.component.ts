import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-unavailability',
  templateUrl: './add-unavailability.component.html',
  styleUrls: ['./add-unavailability.component.scss']
})
export class AddUnavailabilityComponent implements OnInit {

  public employees: Object[] = [
    { id: 1, name: 'Alice Johnson', role: 'Developer' },
    { id: 2, name: 'Bob Smith', role: 'Designer' },
    { id: 3, name: 'Charlie Brown', role: 'Manager' },
    { id: 4, name: 'David Lee', role: 'Tester' },
    { id: 5, name: 'Eve White', role: 'Developer' }
  ];
  public employeeFields: Object = { text: 'name', value: 'id' };

  public reasons: Object[] = [
    { code: 'M', name: 'Meeting', text: 'M - Meeting' },
    { code: 'L', name: 'Lunch', text: 'L - Lunch' },
    { code: 'T', name: 'Training', text: 'T - Training' },
    { code: 'C', name: 'Client Call', text: 'C - Client Call' },
    { code: 'D', name: 'Doctor', text: 'D - Doctor' },
    { code: 'PTO', name: 'Personal Time Off', text: 'PTO - Personal Time Off' }
  ];
  public reasonFields: Object = { text: 'text', value: 'code' };

  public employeeId: number | null = null;
  public reason: string | null = null;
  public startDate: Date | null = null;
  public endDate: Date | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Submitting unavailability:', {
      employeeId: this.employeeId,
      reason: this.reason,
      startDate: this.startDate,
      endDate: this.endDate
    });
    alert('Unavailability added! (Check console)');
  }
}
