import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { RecipeService } from './services/recipe.service';
import { ShoppingService } from './services/shopping.service';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    RecipeService,
    ShoppingService,
  ],
})
export class CoreModule {}
