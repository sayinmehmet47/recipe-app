import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core.module';

import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingListEffects } from './shopping-list/store/shopping-effect';
import * as fromApp from './store/app.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    SharedModule,
    ShoppingListModule,
    AsyncPipe,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([ShoppingListEffects]),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
