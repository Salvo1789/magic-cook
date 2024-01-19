import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loginMode = true;
  loading = false;
  error: string = null;

  constructor(private authService: AuthService,
    private router: Router) {}

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.loginMode) {
     authObs = this.authService.signin(form.value.email, form.value.password);
    } else {
      authObs = this.authService.signup(form.value.email, form.value.password);
      
    }

    authObs.subscribe(
      (response) => {
        console.log(response);
        this.loading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.loading = false;
      }
    )

    form.reset();
  }
}
