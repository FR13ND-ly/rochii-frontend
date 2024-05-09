import { Component, inject, signal } from '@angular/core';
import { ItemsComponent } from './feature/items/items.component';
import { DetailsComponent } from './feature/details/details.component';
import { AccomplishedComponent } from './feature/accomplished/accomplished.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { CartService } from '../../core/data-access/cart.service';
import { ProductsService } from '../../core/data-access/products.service';
import { Observable, finalize, map, switchMap, tap } from 'rxjs';
import { MaterialModule } from '../../core/feature/material/material.module';
import { FormBuilder, Validators } from '@angular/forms';
import { OrdersService } from '../../core/data-access/orders.service';
import { Store } from '@ngrx/store';
import { setLoading } from '../../store/loading/loading.actions';
import { AppointmentingComponent } from './feature/appointmenting/appointmenting.component';
import { DateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from '../../core/feature/material/custom-date.adapter';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ItemsComponent,
    DetailsComponent,
    AccomplishedComponent,
    AppointmentingComponent,
    NgIf,
    AsyncPipe,
    MaterialModule,
  ],

  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  store = inject(Store);
  cartService = inject(CartService);
  productsService = inject(ProductsService);
  ordersService = inject(OrdersService);
  fb = new FormBuilder();

  cart: any = {
    products: [],
  };
  cart$ = this.cartService.cart$;
  stage = signal(1);

  detailsForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    details: [''],
  });

  dateForm = this.fb.group({
    date: [new Date(Date.now() + 86400000), Validators.required],
    hour: [, Validators.required],
  });

  products$: Observable<any> = this.cart$.pipe(
    tap((cart) => {
      this.store.dispatch(setLoading({ state: true }));
      this.cart.products = cart;
    }),
    switchMap((cart: any) => this.productsService.getByIds(cart)),
    tap(() => {
      this.store.dispatch(setLoading({ state: false }));
    })
  );

  onFinishItems() {
    this.stage.set(this.stage() + 1);
  }

  onFinishDetails() {
    this.stage.set(this.stage() + 1);
  }

  onFinishAppointmenting(products: any) {
    let data = {
      ...this.detailsForm.value,
      ...this.dateForm.value,
      products,
    };
    this.store.dispatch(setLoading({ state: true }));
    this.ordersService
      .create(data)
      .pipe(
        finalize(() => {
          this.store.dispatch(setLoading({ state: false }));
        })
      )
      .subscribe(() => {
        this.stage.set(this.stage() + 1);
        this.cartService.resetCart();
      });
  }
}
