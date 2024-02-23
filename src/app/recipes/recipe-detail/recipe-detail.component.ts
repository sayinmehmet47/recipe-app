import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';

import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { addIngredients } from '../../shopping-list/store/shopping-list.action';
import { AppState } from '../../shopping-list/store/shopping-list.reducer';

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
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  onAddToShoppingList() {
    console.log(this.recipe.ingredients);
    if (this.recipe.ingredients) {
      this.store.dispatch(
        addIngredients({
          ingredients: this.recipe.ingredients,
        })
      );
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeId = params['id'];
      this.recipe = this.recipeService.getRecipeById(this.recipeId);
      console.log(this.recipe);
    });
  }
}
