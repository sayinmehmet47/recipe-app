import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store: Store<fromApp.AppState> = inject(Store);
  return store.select('auth').pipe(
    take(1),
    map((authState) => {
      return authState.user;
    }),
    map((user) => {
      const isAUth = !!user;
      if (isAUth) {
        return true;
      }
      return router.createUrlTree(['/auth']);
    })
  );
};
