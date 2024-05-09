import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'cart-details',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  @Input() detailsForm: any;
  @Output() next = new EventEmitter();
}
