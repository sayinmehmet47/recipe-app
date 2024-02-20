import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { AppState } from '../store/shopping-list.reducer';
import { Store } from '@ngrx/store';
import {
  addIngredient,
  deleteItem,
  updateItem,
} from '../store/shopping-list.action';
import {
  selectEditedIndex,
  selectIngredient,
} from '../store/shopping-list.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  shoppingForm: FormGroup;
  editMode: boolean = false;
  editedShoppingItemIndex: number;
  editedShoppingItem: Observable<Ingredient>;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.shoppingForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });

    this.store.select(selectEditedIndex).subscribe((index) => {
      if (index > -1) {
        this.editMode = true;
        this.editedShoppingItemIndex = index;

        this.store.select(selectIngredient).subscribe((editedItem) => {
          if (editedItem) {
            this.shoppingForm.patchValue({
              name: editedItem.name,
              amount: editedItem.amount,
            });
          }
        });
      } else {
        this.editMode = false;
        this.shoppingForm.reset();
      }
    });
  }

  onFormSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        updateItem({
          index: this.editedShoppingItemIndex,
          amount: this.shoppingForm.value.amount,
          name: this.shoppingForm.value.name,
        })
      );
      this.editMode = false;
      this.shoppingForm.reset();
    } else {
      this.store.dispatch(
        addIngredient({
          amount: this.shoppingForm.value.amount,
          name: this.shoppingForm.value.name,
        })
      );
      this.shoppingForm.reset();
    }
  }

  onClear() {
    this.shoppingForm.reset();
  }

  onDelete() {
    this.store.dispatch(
      deleteItem({
        index: this.editedShoppingItemIndex,
      })
    );
  }

  getError(field): ValidationErrors {
    return this.shoppingForm.controls[field].errors;
  }
}
