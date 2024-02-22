import { createReducer, on } from '@ngrx/store';
import {
  addIngredient,
  addIngredients,
  deleteItem,
  getIngredient,
  getIngredients,
  startEdit,
  updateItem,
} from './shopping-list.action';
import { Ingredient } from '../../shared/ingredient.model';

export interface AppState {
  shoppingList: {
    ingredients: Ingredient[];
    editedIndex: number;
    selectedIngredient: Ingredient;
  };
}

export const initialState: AppState = {
  shoppingList: {
    ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
    editedIndex: -1,
    selectedIngredient: null,
  },
};

export const shoppingListReducer = createReducer(
  initialState,
  on(getIngredients, (state) => state),
  on(getIngredient, (state, { index }) => ({
    ...state,
    shoppingList: {
      ...state.shoppingList,
      selectedIngredient: state.shoppingList.ingredients[index],
    },
  })),
  on(addIngredients, (state, { ingredients }) => ({
    ...state,
    shoppingList: {
      ...state.shoppingList,
      ingredients: [...state.shoppingList.ingredients, ...ingredients],
    },
  })),
  on(addIngredient, (state, { name, amount }) => ({
    ...state,
    shoppingList: {
      ...state.shoppingList,
      ingredients: [
        ...state.shoppingList.ingredients,
        new Ingredient(name, amount),
      ],
    },
  })),
  on(deleteItem, (state, { index }) => ({
    ...state,
    shoppingList: {
      ...state.shoppingList,
      ingredients: state.shoppingList.ingredients.filter((_, i) => i !== index),
    },
  })),
  on(updateItem, (state, { name, amount, index }) => ({
    ...state,
    shoppingList: {
      ...state.shoppingList,
      ingredients: state.shoppingList.ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, name, amount } : ingredient
      ),
    },
  })),
  on(startEdit, (state, { index }) => ({
    ...state,
    shoppingList: {
      ...state.shoppingList,
      editedIndex: index,
      selectedIngredient: { ...state.shoppingList.ingredients[index] },
    },
  }))
);
