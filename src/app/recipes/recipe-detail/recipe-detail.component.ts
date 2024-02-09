import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private shoppingService: ShoppingService
  ) {}

  ngOnInit() {}

  get recipe() {
    return this.recipeService.selectedRecipe;
  }

  onAddToShoppingList() {
    this.shoppingService.onAddIngredients(this.recipe.ingredients);
  }
}
