import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserlayoutComponent } from './userlayout.component';

describe('UserlayoutComponent', () => {
  let component: UserlayoutComponent;
  let fixture: ComponentFixture<UserlayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
