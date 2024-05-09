import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductComponent } from '../../ui/product/product.component';
import { MaterialModule } from '../../../../core/feature/material/material.module';

@Component({
  selector: 'cart-items',
  standalone: true,
  imports: [ProductComponent, MaterialModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
})
export class ItemsComponent {
  @Input() products: any;
  @Output() next = new EventEmitter();
}
