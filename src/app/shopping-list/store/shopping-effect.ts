import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { startEdit } from './shopping-list.action';

@Injectable()
export class ShoppingListEffects {
  readonly editStart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(startEdit),
        tap(({ index }) => {
          // Perform the necessary actions, such as opening a dialog or navigating to a different page
          console.log('Edit started for index: ', index);
          // Example: Open a dialog for editing
          // this.dialogService.openEditDialog(index);
        })
      ),
    { dispatch: false } // Set dispatch to false to prevent dispatching additional actions
  );

  constructor(private actions$: Actions) {}
}
