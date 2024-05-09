import { Component } from '@angular/core';
import { HeroComponent } from './ui/hero/hero.component';
import { DescriptionComponent } from './ui/description/description.component';
import { ProductsComponent } from './feature/products/products.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeroComponent, DescriptionComponent, ProductsComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
