import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CourtcasesComponent } from './courtcases.component';

describe('CourtcasesComponent', () => {
  let component: CourtcasesComponent;
  let fixture: ComponentFixture<CourtcasesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtcasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
