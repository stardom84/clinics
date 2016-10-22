import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AboutComponent, HomeComponent, HomeSearchComponent } from './pages';
import { ClinicCardComponent, HeaderComponent } from './components';
import { ApiService, InMemoryDataService } from './shared';
import { routing } from './app.routing';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';


@NgModule({
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {delay: 0})
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    HomeSearchComponent,
    ClinicCardComponent,
    HeaderComponent
  ],
  providers: [
    ApiService
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
