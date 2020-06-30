import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaclientesComponent } from './altaclientes.component';

describe('AltaclientesComponent', () => {
  let component: AltaclientesComponent;
  let fixture: ComponentFixture<AltaclientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaclientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
