import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RequisiteComponent } from './requisite.component';

describe('RequisiteComponent', () => {
  let component: RequisiteComponent;
  let fixture: ComponentFixture<RequisiteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
