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
    if (this.editMode) {
      this.recipeForm = this.fb.group({
        name: [this.recipe.name, Validators.required],
        description: [this.recipe.description],
        imagePath: [this.recipe.imagePath, Validators.required],
        ingredients: this.fb.array([]),
      });

      if (this.recipe.ingredients) {
        this.recipe.ingredients.forEach((ingredient) => {
          (this.recipeForm.get('ingredients') as FormArray).push(
            this.fb.group({
              name: [ingredient.name, Validators.required],
              amount: [
                ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
              ],
            })
          );
        });
      }
    } else {
      this.recipeForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        imagePath: ['', Validators.required],
        ingredients: this.fb.array([]),
      });
    }
  }
  addIngredientGroup() {
    const ingredientsFormArray = this.recipeForm.get(
      'ingredients'
    ) as FormArray;
    ingredientsFormArray.push(
      this.fb.group({
        name: ['', Validators.required],
        amount: [
          '',
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
        ],
      })
    );
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onSubmit() {
    const formData = this.recipeForm.value;
    console.log(this.recipeForm.errors);
    if (this.editMode) {
      this.updateRecipe(formData);
    } else {
      this.addNewRecipe(formData);
    }
  }

  private updateRecipe(formData: Recipe) {
    const updatedRecipe = new Recipe(
      Number(this.id),
      formData.name,
      formData.description,
      formData.imagePath,
      formData.ingredients
    );
    this.recipeService.updateRecipe(updatedRecipe);
  }

  isNameInvalid(index: number): boolean {
    const ingredientFormArray = this.recipeForm.get('ingredients') as FormArray;
    const ingredientFormGroup = ingredientFormArray.at(index) as FormGroup;
    const nameFormControl = ingredientFormGroup.get('name');
    return nameFormControl.invalid && nameFormControl.touched;
  }

  isAmountInvalid(index: number): boolean {
    const ingredientFormArray = this.recipeForm.get('ingredients') as FormArray;
    const ingredientFormGroup = ingredientFormArray.at(index) as FormGroup;
    const amountFormControl = ingredientFormGroup.get('amount');
    return amountFormControl.invalid && amountFormControl.touched;
  }

  private addNewRecipe(formData: Recipe) {
    const newRecipe = new Recipe(
      Math.random(),
      formData.name,
      formData.description,
      formData.imagePath,
      formData.ingredients.map(
        (ingredient: Ingredient) =>
          new Ingredient(ingredient.name, ingredient.amount)
      )
    );
    this.recipeService.addRecipe(newRecipe);
  }

  removeIngredient(index: number): void {
    const ingredientFormArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientFormArray.removeAt(index);
  }
}
