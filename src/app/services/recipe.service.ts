import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  selectedRecipe: Recipe;
  recipes: Recipe[];

  constructor() {}

  getRecipeById(id: string): Recipe {
    return this.recipes.find((recipe) => recipe.id === Number(id));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(updatedRecipe: Recipe) {
    const recipe = this.recipes.find(
      (recipe) => recipe.id === updatedRecipe.id
    );
    if (recipe != null) {
      recipe.description = updatedRecipe.description;
      recipe.imagePath = updatedRecipe.imagePath;
      recipe.name = updatedRecipe.name;
      recipe.ingredients = updatedRecipe.ingredients;
    } else {
      return;
    }
  }
}
