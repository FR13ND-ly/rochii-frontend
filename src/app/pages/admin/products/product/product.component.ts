import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { ImageComponent } from '../../../../core/ui/image/image.component';
import { JsonPipe } from '@angular/common';
import { AdminService } from '../../../../core/data-access/admin.service';
import { Store } from '@ngrx/store';
import { setLoading } from '../../../../store/loading/loading.actions';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'product',
  standalone: true,
  imports: [MaterialModule, ImageComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product: any;
  @Output() delete = new EventEmitter();
  store = inject(Store);
  router = inject(Router);
  adminService = inject(AdminService);

  onEdit() {
    this.router.navigate([`/admin/products/edit/${this.product.id}`]);
  }

  onDelete() {
    if (!confirm('Ești sigur?')) return;
    this.store.dispatch(setLoading({ state: true }));
    this.adminService
      .deleteProduct(this.product.id)
      .pipe(finalize(() => this.store.dispatch(setLoading({ state: false }))))
      .subscribe((res) => {
        this.delete.emit();
      });
  }
}
