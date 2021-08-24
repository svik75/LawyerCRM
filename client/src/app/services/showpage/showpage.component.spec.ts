import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowpageComponent } from './showpage.component';

describe('ShowpageComponent', () => {
  let component: ShowpageComponent;
  let fixture: ComponentFixture<ShowpageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
