import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRouterModule } from './shopping-list-router.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    ShoppingListRouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ShoppingListModule {}
