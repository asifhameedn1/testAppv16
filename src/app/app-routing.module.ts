import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeUnavailabilityComponent } from './employee-unavailability/employee-unavailability.component';
import { AddUnavailabilityComponent } from './add-unavailability/add-unavailability.component';
import { WorkforceAllocationBoardComponent } from './workforce-allocation-board/workforce-allocation-board.component';
import { DailyAvailabilityComponent } from './daily-availability/daily-availability.component';

const routes: Routes = [{
  path: 'employee-unavailability',
  component: EmployeeUnavailabilityComponent
},
{
  path: 'add-unavailability',
  component: AddUnavailabilityComponent
},
{
  path: 'workforce-allocation',
  component: WorkforceAllocationBoardComponent
},
{
  path: 'daily-availability',
  component: DailyAvailabilityComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
