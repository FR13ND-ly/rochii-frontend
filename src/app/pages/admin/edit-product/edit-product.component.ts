import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AdminService } from '../../../core/data-access/admin.service';
import { ImageComponent } from '../../../core/ui/image/image.component';
import { FilesService } from '../../../core/data-access/files.service';
import { setLoading } from '../../../store/loading/loading.actions';
import { finalize, switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { selectLoadingState } from '../../../store/loading/loading.reduce';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, ImageComponent, AsyncPipe],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent implements OnInit {
  store = inject(Store);
  adminService = inject(AdminService);
  filesService = inject(FilesService);
  route = inject(ActivatedRoute);

  fb = new FormBuilder();

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
  });

  id: number = 0;
  images: any = [];

  loading$ = this.store.select(selectLoadingState);

  ngOnInit(): void {
    this.store.dispatch(setLoading({ state: true }));
    this.route.paramMap
      .pipe(
        switchMap((params: Params) =>
          this.adminService.getProductById(params['params'].id)
        )
      )
      .subscribe((res: any) => {
        this.id = res.id;
        this.productForm.patchValue(res);
        this.images.push({
          id: res.mainImg.id,
          main: true,
        });
        res.images.forEach((img: any) => {
          this.images.push({
            id: img.id,
            main: false,
          });
        });
        this.store.dispatch(setLoading({ state: false }));
      });
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
    this.images.splice(index, 1);
  }

  onSubmit() {
    if (this.productForm.invalid) return;
    let data = {
      ...this.productForm.value,
      images: this.images,
    };
    this.store.dispatch(setLoading({ state: true }));
    this.adminService
      .updateProduct(this.id, data)
      .pipe(finalize(() => this.store.dispatch(setLoading({ state: false }))))
      .subscribe((res) => {
        console.log(res);
      });
  }
}
