import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeConstructorComponent } from './office-constructor.component';

describe('OfficeConstructorComponent', () => {
  let component: OfficeConstructorComponent;
  let fixture: ComponentFixture<OfficeConstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeConstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
