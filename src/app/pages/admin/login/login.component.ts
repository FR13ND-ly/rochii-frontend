import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { Store } from '@ngrx/store';
import { setLoading } from '../../../store/loading/loading.actions';
import { userActions } from '../../../store/user/user.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  store = inject(Store);
  fb = new FormBuilder();

  authForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    this.store.dispatch(setLoading({ state: false }));
  }

  onSubmit() {
    if (this.authForm.invalid) return;
    this.store.dispatch(setLoading({ state: true }));
    let loginCredentianls = { ...this.authForm.value };
    this.store.dispatch(userActions.login({ loginCredentianls }));
  }
}
