import { Component, afterNextRender, inject } from '@angular/core';
import { ProductsService } from '../../../../core/data-access/products.service';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { ImageComponent } from '../../../../core/ui/image/image.component';

@Component({
  selector: 'similar-products',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink, ImageComponent],
  templateUrl: './similar-products.component.html',
  styleUrl: './similar-products.component.scss',
})
export class SimilarProductsComponent {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  products$!: Observable<any>;

  constructor() {
    afterNextRender(() => {
      this.products$ = this.route.paramMap.pipe(
        switchMap((params: Params) => {
          return this.productsService.getSimilar(params['params'].id);
        })
      );
    });
  }
}
