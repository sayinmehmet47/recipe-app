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
      1,
      'Doner',
      'This is simply a test 1',
      'https://www.unicornsinthekitchen.com/wp-content/uploads/2022/11/Doner-kebab-sq.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      2,
      'Maklube',
      'This is simply a test 2',
      'https://i.ytimg.com/vi/IpUyWEXjnhU/maxresdefault.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

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
