import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { autoLogin } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedFeature: string = 'recipe';

  constructor(private store: Store) {}

  onFeatureSelected(feature: string) {
    this.selectedFeature = feature;
  }

  ngOnInit() {
    this.store.dispatch(autoLogin());
  }
}
