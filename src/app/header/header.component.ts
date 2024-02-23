import { Component, EventEmitter, Output } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { DataStorageService } from '../services/data-storage.service';
import * as fromAuthActions from '../auth/store/auth.actions';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private userSub: Subscription;
  isAuthenticated = false;
  @Output() featureSelected = new EventEmitter<string>();

  constructor(
    private dataStorageService: DataStorageService,

    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  handleNavigationSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  storeRecipes() {
    this.dataStorageService.storeRecipes().subscribe((recipes) => {
      console.log(recipes);
    });
  }

  onLogout() {
    this.store.dispatch(new fromAuthActions.Logout());
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe((recipes) => {});
  }
}
