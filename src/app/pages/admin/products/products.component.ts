import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe, NgIf, isPlatformBrowser } from '@angular/common';
import { AdminService } from '../../../core/data-access/admin.service';
import {
  BehaviorSubject,
  Observable,
  finalize,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import { ProductComponent } from './product/product.component';
import { Store } from '@ngrx/store';
import { setLoading } from '../../../store/loading/loading.actions';
import { selectLoadingState } from '../../../store/loading/loading.reduce';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, MaterialModule, RouterLink, AsyncPipe, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  store = inject(Store);
  adminService = inject(AdminService);
  platformId = inject(PLATFORM_ID);

  products$!: Observable<any>;

  $index = new BehaviorSubject(1);

  loading$ = this.store.select(selectLoadingState);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.products$ = this.$index.pipe(
        tap(() => this.store.dispatch(setLoading({ state: true }))),
        switchMap((index: any) => this.adminService.getAllProducts(index)),
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
    this.$index.next(this.$index.value + 1);
  }
}
