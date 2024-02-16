import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  shoppingForm: FormGroup;
  editMode: boolean = false;
  editedShoppingItemIndex: number;
  editedShoppingItem: Ingredient;

  constructor(
    private shoppingService: ShoppingService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.shoppingForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });

    this.shoppingService.editStart.subscribe((index) => {
      this.editMode = true;
      this.editedShoppingItemIndex = index;
      this.editedShoppingItem = this.shoppingService.getShoppingItem(index);
      this.shoppingForm.patchValue({
        name: this.editedShoppingItem.name,
        amount: this.editedShoppingItem.amount,
      });
    });
  }

  onFormSubmit() {
    if (this.editMode) {
      this.shoppingService.updateShoppingItem({
        index: this.editedShoppingItemIndex,
        name: this.shoppingForm.value.name,
        amount: this.shoppingForm.value.amount,
      });
      this.editMode = false;
      this.shoppingForm.reset();
    } else {
      this.shoppingService.onAddIngredient(this.shoppingForm.value);
      this.shoppingForm.reset();
    }
  }

  onClear() {
    this.shoppingForm.reset();
  }

  onDelete() {
    this.shoppingService.deleteItem(this.editedShoppingItemIndex);
  }

  getError(field): ValidationErrors {
    return this.shoppingForm.controls[field].errors;
  }
}
