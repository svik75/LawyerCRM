import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsFLComponent } from './claims-fl.component';

describe('ClaimsFLComponent', () => {
  let component: ClaimsFLComponent;
  let fixture: ComponentFixture<ClaimsFLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsFLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsFLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
