// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { Ingredient } from '../shared/ingredient.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class ShoppingService {
//   editStart = new Subject<number>();

//   ingredients: Ingredient[] = [
//     new Ingredient('Apples', 5),
//     new Ingredient('Tomatoes', 10),
//   ];

//   onAddIngredient(ingredient: Ingredient) {
//     this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
//   }

//   onAddIngredients(ingredients: Ingredient[]) {
//     this.ingredients.push(...ingredients);
//   }

//   deleteItem(index) {
//     this.ingredients.splice(index, 1);
//   }

//   getShoppingItem(index: number) {
//     return this.ingredients[index];
//   }

//   updateShoppingItem({
//     index,
//     name,
//     amount,
//   }: {
//     index: number;
//     name: string;
//     amount: number;
//   }) {
//     const ingredient = this.ingredients[index];
//     if (name !== undefined) {
//       ingredient.name = name;
//     }
//     if (amount !== undefined) {
//       ingredient.amount = amount;
//     }
//   }

//   constructor() {}
// }
