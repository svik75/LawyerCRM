import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UslugiULComponent } from './uslugi-ul.component';

describe('UslugiULComponent', () => {
  let component: UslugiULComponent;
  let fixture: ComponentFixture<UslugiULComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UslugiULComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UslugiULComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
