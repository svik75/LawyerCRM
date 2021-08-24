import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClaimsULComponent } from './claims-ul.component';

describe('ClaimsULComponent', () => {
  let component: ClaimsULComponent;
  let fixture: ComponentFixture<ClaimsULComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsULComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsULComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
