import { Injectable, afterNextRender, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  snackbar = inject(MatSnackBar);
  router = inject(Router);

  constructor() {
    afterNextRender(() => {
      let cart = JSON.parse(localStorage.getItem('cart')!);
      if (cart) this.cartSubject$.next(cart);
      else this.cartSubject$.next([]);
    });
  }

  cartSubject$ = new BehaviorSubject<any>(-1);

  cart$ = this.cartSubject$.pipe(
    filter((cart) => cart != -1),
    tap((cart) => {
      localStorage.setItem('cart', JSON.stringify(cart));
    })
  );

  addProduct(product: number) {
    if (!this.cartSubject$.value.includes(product)) {
      let cart: any[] = [...this.cartSubject$.value, product];
      this.cartSubject$.next(cart);
    }
    let snackbar = this.snackbar.open('Produsul a fost adăugat în coș', 'Coș', {
      duration: 5000,
    });
    snackbar.onAction().subscribe(() => this.router.navigate(['/cart']));
  }

  isInCart(product: string) {
    console.log(this.cartSubject$.value);
    return this.cartSubject$.pipe(
      map((products: any) => {
        return products.includes(parseInt(product));
      })
    );
  }

  removeProduct(product: any) {
    this.cartSubject$.next(
      this.cartSubject$.value.filter((item: any) => item != product.id)
    );
  }

  resetCart() {
    this.cartSubject$.next([]);
  }
}
