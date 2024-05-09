import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageComponent } from '../../../core/ui/image/image.component';
import { AdminService } from '../../../core/data-access/admin.service';
import { FilesService } from '../../../core/data-access/files.service';
import { Store } from '@ngrx/store';
import { setLoading } from '../../../store/loading/loading.actions';
import { finalize } from 'rxjs';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { Router } from '@angular/router';
import { selectLoadingState } from '../../../store/loading/loading.reduce';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, ImageComponent, MaterialModule, AsyncPipe],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  store = inject(Store);
  adminService = inject(AdminService);
  filesService = inject(FilesService);
  router = inject(Router);

  fb = new FormBuilder();

  loading$ = this.store.select(selectLoadingState);

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['Lorem ipsum', Validators.required],
    price: [0, Validators.required],
  });

  images: any = [];

  ngOnInit(): void {
    this.store.dispatch(setLoading({ state: false }));
  }

  onAddImage(e: any) {
    this.store.dispatch(setLoading({ state: true }));
    this.filesService
      .uploadImage(e)
      .pipe(
        finalize(() => {
          this.store.dispatch(setLoading({ state: false }));
        })
      )
      .subscribe((res: any) => {
        this.images.push({
          id: res.id,
          main: !this.images.length,
        });
      });
  }

  onSetMain(index: number) {
    this.images = this.images.map((el: any) => {
      el.main = false;
      return el;
    });
    this.images[index].main = true;
  }

  onDeleteImage(index: number) {
    if (!confirm('Ești sigur?')) return;
    if (this.images[index].main) {
      this.images.splice(index, 1);
      if (this.images.length) {
        this.images[0].main = true;
      }
    } else {
      this.images.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;
    this.store.dispatch(setLoading({ state: true }));
    let data = {
      ...this.productForm.value,
      images: this.images,
    };
    this.adminService.createProduct(data).subscribe((res) => {
      this.store.dispatch(setLoading({ state: false }));
      this.router.navigate(['/admin/products']);
    });
  }
}
