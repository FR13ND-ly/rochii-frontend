import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/data-access/auth.service';
import { Store } from '@ngrx/store';
import { userActions } from '../../../../store/user/user.actions';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  store = inject(Store);

  logout() {
    this.store.dispatch(userActions.logout());
  }
}
