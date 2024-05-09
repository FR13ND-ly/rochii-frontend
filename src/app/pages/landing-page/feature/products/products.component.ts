import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { ProductsService } from '../../../../core/data-access/products.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, scan, switchMap, tap } from 'rxjs';
import { ImageComponent } from '../../../../core/ui/image/image.component';
import { Store } from '@ngrx/store';
import { setLoading } from '../../../../store/loading/loading.actions';
import { selectLoadingState } from '../../../../store/loading/loading.reduce';

@Component({
  selector: 'lp-products',
  standalone: true,
  imports: [ImageComponent, RouterLink, NgIf, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  store = inject(Store);
  productsService = inject(ProductsService);
  platformId = inject(PLATFORM_ID);

  products$!: Observable<any>;

  $index = new BehaviorSubject(1);

  loading$ = this.store.select(selectLoadingState);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.products$ = this.$index.pipe(
        switchMap((index: any) => this.productsService.getAll(index)),
        scan(
          (acc: any, res: any) => {
            return {
              more: res.more,
              products: [...acc.products, ...res.products],
            };
          },
          {
            more: false,
            products: [],
          }
        ),
        tap(() => this.store.dispatch(setLoading({ state: false })))
      );
    }
  }

  onLoadMore() {
    this.store.dispatch(setLoading({ state: true }));
    this.$index.next(this.$index.value + 1);
  }
}
