import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { authGuard } from '../../core/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { logoutGuard } from '../../core/guards/logout.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            component: DashboardComponent,
          },
          {
            path: 'products',
            component: ProductsComponent,
          },
          {
            path: 'products/add',
            component: AddProductComponent,
          },
          {
            path: 'products/edit/:id',
            component: EditProductComponent,
          },
          {
            path: 'orders',
            component: OrdersComponent,
          },
          {
            path: 'statistics',
            component: StatisticsComponent,
          },
        ],
        canActivate: [authGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [logoutGuard],
      },
    ]),
  ],
})
export class AdminModule {}
