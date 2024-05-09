import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from '../../../core/data-access/admin.service';
import {
  BehaviorSubject,
  Observable,
  finalize,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { setLoading } from '../../../store/loading/loading.actions';
import { AsyncPipe, NgIf } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    AsyncPipe,
    OrderComponent,
    NgIf,
    MaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  store = inject(Store);
  adminService = inject(AdminService);
  fb = new FormBuilder();

  $index = new BehaviorSubject(1);

  orders$!: Observable<any>;

  ngOnInit(): void {
    this.orders$ = this.$index.pipe(
      tap(() => {
        this.store.dispatch(setLoading({ state: true }));
      }),
      switchMap((index: any) => this.adminService.getOrders(index)),
      scan(
        (acc: any, res: any) => {
          return {
            more: res.more,
            orders: [...acc.orders, ...res.orders],
          };
        },
        {
          more: false,
          orders: [],
        }
      ),
      tap((res: any) => {
        this.store.dispatch(setLoading({ state: false }));
      })
    );
  }

  onLoadMore() {
    this.$index.next(this.$index.value + 1);
  }
}
