import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { DataStorageService } from '../services/data-storage.service';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolver implements Resolve<Observable<Recipe[]>> {
  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> {
    const recipes = this.recipeService.recipes;
    console.log('recipes', recipes);
    if (!recipes) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return of(recipes);
    }
  }
}
