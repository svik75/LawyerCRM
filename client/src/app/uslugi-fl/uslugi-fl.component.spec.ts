import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UslugiFLComponent } from './uslugi-fl.component';

describe('UslugiFLComponent', () => {
  let component: UslugiFLComponent;
  let fixture: ComponentFixture<UslugiFLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UslugiFLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UslugiFLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
