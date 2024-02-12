import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent {
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) {}
  id: string;
  editMode: boolean;
  recipeForm: FormGroup;
  recipe: Recipe;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.recipe = this.recipeService.getRecipeById(this.id);
    });

    this.recipeForm = this.fb.group({
      name: [this.recipe.name, Validators.required],
      description: [this.recipe.description],
      imagePath: [this.recipe.imagePath, Validators.required],
      ingredients: this.fb.array([]),
    });

    if (this.editMode) {
      this.recipe.ingredients.forEach((ingredient) => {
        (this.recipeForm.get('ingredients') as FormArray).push(
          this.fb.group({
            name: [ingredient.name, Validators.required],
            amount: [ingredient.amount, Validators.required],
          })
        );
      });
    }
  }
  addIngredient() {
    const ingredientsFormArray = this.recipeForm.get(
      'ingredients'
    ) as FormArray;
    ingredientsFormArray.push(
      this.fb.group({
        name: [''],
        amount: [''],
      })
    );
  }
  onSubmit() {
    console.log(this.recipeForm.value);
    this.recipeService.addRecipe(
      new Recipe(
        Math.random(),
        this.recipeForm.get('name').value,
        this.recipeForm.get('description').value,
        this.recipeForm.get('imagePath').value,
        this.recipeForm
          .get('ingredients')
          .value.map((ingredient) => new Ingredient(ingredient, 1))
      )
    );
  }
}
