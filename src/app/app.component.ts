import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedFeature: string = 'recipe';

  constructor(private authService: AuthService) {}

  onFeatureSelected(feature: string) {
    this.selectedFeature = feature;
  }

  ngOnInit() {
    this.authService.autoLogin();
  }
}
