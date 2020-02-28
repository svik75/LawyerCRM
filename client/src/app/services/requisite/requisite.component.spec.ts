import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisiteComponent } from './requisite.component';

describe('RequisiteComponent', () => {
  let component: RequisiteComponent;
  let fixture: ComponentFixture<RequisiteComponent>;

  beforeEach(async(() => {
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
