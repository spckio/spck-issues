import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

@Component({
  selector: 'my-app',
  templateUrl: './app.html',
})
export class App {
  heading: string;
  text: string;

  constructor() {
    this.heading = `Angular v${VERSION.full}`;
    this.text = "A neat desk is a sign of a cluttered desk drawer.";
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [App],
  bootstrap: [App]
})
export class AppModule {
}
