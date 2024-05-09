import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { MaterialModule } from '../../feature/material/material.module';
import { CartService } from '../../data-access/cart.service';
import { Store } from '@ngrx/store';
import { selectLoadingState } from '../../../store/loading/loading.reduce';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  cartService = inject(CartService);
  changes = inject(ChangeDetectorRef);
  store = inject(Store);
  router = inject(Router);

  loading$ = this.store.select(selectLoadingState);
  cartLength = signal(0);

  urls = ['/', '/#products'];
  hide = false;

  ngOnInit(): void {
    this.router.events.subscribe((res: any) => {
      if (res.type == 0) {
        this.hide = !this.urls.includes(res.url);
      }
    });
  }
  show: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.show = window.pageYOffset > 40;
  }

  ngAfterViewInit(): void {
    this.cartService.cart$
      .pipe(map((cart: any) => cart.length))
      .subscribe((res) => {
        this.cartLength.set(res);
        this.changes.detectChanges();
      });
  }
}
