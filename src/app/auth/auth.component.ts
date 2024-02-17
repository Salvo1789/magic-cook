import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy{
  loginMode = true;
  loading = false;
  error: string = null;

  constructor(private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // authObs.subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.loading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMessage) => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.loading = false;
    //   }
    // )

    this.store.select('auth').subscribe(authState => {
      this.loading = authState.loading;
      this.error = authState.authError;
    });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.loginMode) {
    //  authObs = this.authService.signin(form.value.email, form.value.password);
    this.store.dispatch(new AuthActions.LoginStartAction({email: form.value.email, password: form.value.password}))
    } else {
      authObs = this.authService.signup(form.value.email, form.value.password);
      
    }

    

    

    form.reset();
  }

  onHandleError(){
    this.error = null;
  }
}
