import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lp-description',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss',
})
export class DescriptionComponent {}
