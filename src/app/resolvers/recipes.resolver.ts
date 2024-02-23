import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { DataStorageService } from '../services/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolver implements Resolve<Observable<Recipe[]>> {
  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService
  ) {}

  resolve(): Observable<Recipe[]> {
    const recipes = this.recipeService.recipes;

    if (!recipes) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return of(recipes);
    }
  }
}
