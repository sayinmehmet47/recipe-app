import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './shopping-list.reducer';

export const selectShoppingListState = createFeatureSelector('shoppingList');

export const selectShoppingListIngredients = createSelector(
  selectShoppingListState,
  (state: AppState) => state.shoppingList.ingredients
);

export const selectEditedIndex = createSelector(
  selectShoppingListState,
  (state: AppState) => state.shoppingList.editedIndex
);

export const selectIngredient = createSelector(
  selectShoppingListState,
  (state: AppState) => state.shoppingList.selectedIngredient
);
