import { Component } from '@angular/core';
import { AuthResponse, AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const { email, password } = form.value;
    let authObs: Observable<AuthResponse>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login({ email, password });
    } else {
      this.authService.signUp({ email, password });
    }
    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errMessage) => {
        this.error = errMessage;
      }
    );

    form.reset();
  }
}
