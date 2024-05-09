import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from '../../../../core/data-access/orders.service';
import { BehaviorSubject, Observable, Subject, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from '../../../../core/feature/material/custom-date.adapter';

@Component({
  selector: 'cart-appointmenting',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, AsyncPipe, NgIf],
  templateUrl: './appointmenting.component.html',
  styleUrl: './appointmenting.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'ro-Ro' },
  ],
})
export class AppointmentingComponent implements OnInit {
  @Input() dateForm: any;
  ordersService = inject(OrdersService);

  selected$ = new BehaviorSubject<any>(null);
  availableHours$: Observable<any> = this.selected$.pipe(
    switchMap((day: any) =>
      this.ordersService.getAvailableHours(day).pipe(
        tap(() => {
          this.dateForm.patchValue({ hour: null });
        })
      )
    )
  );

  minDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  ngOnInit(): void {
    this.selected$.next(this.dateForm.controls.date.value);
  }

  updateDate(value: any) {
    this.dateForm.patchValue({ date: value });
    this.selected$.next(value);
  }

  daysFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 1;
  };
}
