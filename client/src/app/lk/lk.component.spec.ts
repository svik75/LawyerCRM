import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LkComponent } from './lk.component';

describe('LkComponent', () => {
  let component: LkComponent;
  let fixture: ComponentFixture<LkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
