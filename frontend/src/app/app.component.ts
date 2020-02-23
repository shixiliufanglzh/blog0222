import { Component } from '@angular/core';
import { ConfigService } from './core/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private configService: ConfigService
  ) { }

  get currentUser() {
    return this.configService.currentUser || null;
  }
}
