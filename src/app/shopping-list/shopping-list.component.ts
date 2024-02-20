import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/shopping-list.reducer';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { startEdit } from './store/shopping-list.action';
import { selectShoppingListIngredients } from './store/shopping-list.selector';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients$: Observable<Ingredient[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.ingredients$ = this.store.select(selectShoppingListIngredients);
  }

  onEditItem(index: number) {
    this.store.dispatch(startEdit({ index }));
  }
}
