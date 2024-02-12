import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      console.log(this.editMode);
    });

    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      imagePath: ['', Validators.required],
      ingredients: [''],
    });
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
