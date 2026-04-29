import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkforceAllocationBoardComponent } from './workforce-allocation-board.component';

describe('WorkforceAllocationBoardComponent', () => {
  let component: WorkforceAllocationBoardComponent;
  let fixture: ComponentFixture<WorkforceAllocationBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkforceAllocationBoardComponent]
    });
    fixture = TestBed.createComponent(WorkforceAllocationBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
