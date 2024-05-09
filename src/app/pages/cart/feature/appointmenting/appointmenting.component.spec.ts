import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentingComponent } from './appointmenting.component';

describe('AppointmentingComponent', () => {
  let component: AppointmentingComponent;
  let fixture: ComponentFixture<AppointmentingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
