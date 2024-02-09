import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../services/shopping.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  constructor(private shoppingService: ShoppingService) {}

  get ingredients() {
    return this.shoppingService.ingredients;
  }
}
