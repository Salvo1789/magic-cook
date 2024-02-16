import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription, map } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducer';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class headerComponent implements OnInit, OnDestroy {
    collapsed = true;
    authenticated = false;
    private userSub: Subscription;

    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>){}
    

    ngOnInit(): void {
        this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(
            user => {
                this.authenticated = !user ? false : true;
            }
        );
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe;
    }

    onLogout(){
        this.authService.logout();
    }

    onSaveData(){
        this.dataStorageService.saveRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes()
        .subscribe();
    }
}