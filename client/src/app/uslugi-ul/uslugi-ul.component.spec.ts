import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UslugiULComponent } from './uslugi-ul.component';

describe('UslugiULComponent', () => {
  let component: UslugiULComponent;
  let fixture: ComponentFixture<UslugiULComponent>;

  beforeEach(async(() => {
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
