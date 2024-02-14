import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  url =
    'https://neat-dynamo-388020-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(
    private recipeService: RecipeService,
    private httpClient: HttpClient
  ) {}
  fetchRecipes() {
    return this.httpClient.get<Recipe[]>(this.url).pipe(
      tap((response) => {
        this.recipeService.recipes = response;
      })
    );
  }
  storeRecipes() {
    const recipes = this.recipeService.recipes;
    return this.httpClient.put<Recipe[]>(this.url, recipes);
  }
}
