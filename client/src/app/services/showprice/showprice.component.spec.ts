import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowpriceComponent } from './showprice.component';

describe('ShowpriceComponent', () => {
  let component: ShowpriceComponent;
  let fixture: ComponentFixture<ShowpriceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowpriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
