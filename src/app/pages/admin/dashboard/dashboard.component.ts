import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from '../../../core/data-access/admin.service';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Observable, finalize } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { setLoading } from '../../../store/loading/loading.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, MatIcon, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  store = inject(Store);
  adminService = inject(AdminService);

  dashboard$: Observable<any> = this.adminService
    .getDashboard()
    .pipe(finalize(() => this.store.dispatch(setLoading({ state: false }))));

  ngOnInit(): void {
    this.store.dispatch(setLoading({ state: true }));
  }
}
