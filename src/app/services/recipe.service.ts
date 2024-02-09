import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  selectedRecipe: Recipe;
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test 1',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'A Test Recipe',
      'This is simply a test 2',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  onRecipeSelect(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }

  constructor() {}
}
