import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ShoppingService } from '../../services/shopping.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeId: string;
  recipe: Recipe;
  constructor(
    private recipeService: RecipeService,
    private shoppingService: ShoppingService,
    private route: ActivatedRoute
  ) {}

  onAddToShoppingList() {
    this.shoppingService.onAddIngredients(this.recipe.ingredients);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeId = params['id'];
      this.recipe = this.recipeService.getRecipeById(this.recipeId);
    });
  }
}
