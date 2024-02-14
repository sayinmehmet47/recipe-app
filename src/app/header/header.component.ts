import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}

  @Output() featureSelected = new EventEmitter<string>();

  handleNavigationSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  storeRecipes() {
    this.dataStorageService.storeRecipes().subscribe((recipes) => {
      console.log(recipes);
    });
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe((recipes) => {
      console.log(recipes);
    });
  }
}
