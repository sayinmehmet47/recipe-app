import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { startEdit } from './store/shopping-list.action';
import { selectShoppingListIngredients } from './store/shopping-list.selector';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients$: Observable<Ingredient[]>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients$ = this.store.select(selectShoppingListIngredients);
  }

  onEditItem(index: number) {
    this.store.dispatch(startEdit({ index }));
  }
}
