import { Component, afterNextRender, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../core/data-access/products.service';
import { Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ImagesComponent } from './feature/images/images.component';
import { CartService } from '../../core/data-access/cart.service';
import { SimilarProductsComponent } from './feature/similar-products/similar-products.component';
import { Store } from '@ngrx/store';
import { setLoading } from '../../store/loading/loading.actions';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SimilarProductsComponent, ImagesComponent, AsyncPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  store = inject(Store);
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  cartService = inject(CartService);

  product$!: Observable<any>;
  isInCart$ = this.route.paramMap.pipe(
    switchMap((params: Params) =>
      this.cartService.isInCart(params['params'].id)
    )
  );

  constructor() {
    afterNextRender(() => {
      this.product$ = this.route.paramMap.pipe(
        tap(() => this.store.dispatch(setLoading({ state: true }))),
        switchMap((params: Params) => {
          return this.productsService.getById(params['params'].id);
        }),
        tap(() => this.store.dispatch(setLoading({ state: false })))
      );
    });
  }

  onAddToCart(id: any) {
    this.cartService.addProduct(id);
  }
}
