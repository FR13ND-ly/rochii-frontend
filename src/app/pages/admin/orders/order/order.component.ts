import { DatePipe, JsonPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { AdminService } from '../../../../core/data-access/admin.service';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { ImageComponent } from '../../../../core/ui/image/image.component';

@Component({
  selector: 'order',
  standalone: true,
  imports: [ImageComponent, MaterialModule, DatePipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  @Input() order: any;
  @Output() delete = new EventEmitter();
  adminService = inject(AdminService);

  price: number = 0;

  ngOnInit(): void {
    this.order.products.forEach((product: any) => {
      this.price += product.price;
    });
  }

  onComplete(productId: number) {
    if (!confirm('Ești sigur?')) return;
    this.adminService.completeOrder(productId).subscribe((res) => {
      this.order = res;
    });
  }

  onDelete(productId: number) {
    if (!confirm('Ești sigur?')) return;
    this.adminService
      .deleteOrder(productId)
      .subscribe(() => this.delete.emit());
  }
}
