import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminService } from '../../../../core/data-access/admin.service';
import { finalize } from 'rxjs';
import { setLoading } from '../../../../store/loading/loading.actions';
import { ImageComponent } from '../../../../core/ui/image/image.component';
import { MatIcon } from '@angular/material/icon';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { CartService } from '../../../../core/data-access/cart.service';

@Component({
  selector: 'product',
  standalone: true,
  imports: [ImageComponent, MaterialModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product: any;
  @Output() delete = new EventEmitter();
  store = inject(Store);
  router = inject(Router);
  adminService = inject(AdminService);
  cartService = inject(CartService);

  onDeleteProduct() {
    this.cartService.removeProduct(this.product);
  }
}
