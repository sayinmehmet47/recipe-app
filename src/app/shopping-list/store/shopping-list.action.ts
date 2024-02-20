import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const getIngredients = createAction(
  '[Shopping List Component] Get all Ingredients'
);

export const getIngredient = createAction(
  '[Shopping List Component] Get Ingredient',
  props<{ index: number }>()
);
export const addIngredient = createAction(
  '[Shopping List Component] Add Ingredient',
  props<{ name: string; amount: number }>()
);
export const addIngredients = createAction(
  '[ Shopping List Component] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);
export const deleteItem = createAction(
  '[Shopping List Component] Delete Item',
  props<{ index: number }>()
);
export const getItem = createAction(
  '[Shopping List Component] Get Item',
  props<{ index: number }>()
);
export const updateItem = createAction(
  '[Shopping List Component] Update Item',
  props<{ index: number; name: string; amount: number }>()
);

export const startEdit = createAction(
  '[Shopping List] Edit Start',
  props<{ index: number }>()
);
