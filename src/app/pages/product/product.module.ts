import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([{ path: '', component: ProductComponent }])],
})
export class ProductModule {}
