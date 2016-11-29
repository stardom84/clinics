import './model/_index';
import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {RegisterComponent, HomeComponent} from './pages/_index';
import {HomeSearchComponent, ClinicCardComponent, HeaderComponent} from './components/_index';
import {ApiService, ObservableService} from './shared/_index';
import {removeNgStyles, createNewHosts} from '@angularclass/hmr';


@NgModule({
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    HomeSearchComponent,
    ClinicCardComponent,
    HeaderComponent
  ],
  providers: [
    ApiService,
    ObservableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }

  hmrOnInit(store) {
    console.log('HMR store', store);
  }

  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
