import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {
  constructor(private recipeService: RecipeService) {}
  onRecipeSelect(recipe: Recipe) {
    this.recipeService.onRecipeSelect(recipe);
  }
  get selectedRecipe() {
    return this.recipeService.selectedRecipe;
  }
}
