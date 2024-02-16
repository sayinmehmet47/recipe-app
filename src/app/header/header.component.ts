import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';

import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
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
    this.authService.logout();
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe((recipes) => {});
  }
}
