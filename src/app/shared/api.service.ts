import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import {ObservableService} from './observable.service';

let firebaseConfig = {
  apiKey: 'AIzaSyBb5BAKWzefQHM65bn-2iUohqJvyXC347s',
  authDomain: 'clinics-45581.firebaseapp.com',
  databaseURL: 'https://clinics-45581.firebaseio.com',
  storageBucket: 'clinics-45581.appspot.com',
  messagingSenderId: '252734030713'
};

@Injectable()
export class ApiService {

  public database: firebase.database.Database;

  constructor(
    private observable: ObservableService
  ) {
    this.init();
  }

  get() {
    return {
      clinics: (): Observable<model.IClinicDTO[]> => {
        return this.observable
                   .get('clinics')
                   .map(this.extractSnapshot)
                   .catch(this.handleError);
      },
      deals: (): Observable<model.IDealDTO[]> => {
        return this.observable
                   .get('deals')
                   .map(this.extractSnapshot)
                   .catch(this.handleError);
      }
    };
  }

  extractSnapshot(snapshot: firebase.database.DataSnapshot): any {
    return snapshot.val();
  }

  private init(): void {
    this.initDb();
    this.setObservables();
  }

  private initDb(): void {
    this.database = firebase.initializeApp(firebaseConfig).database();
  }

  private setObservables(): void {
    this.observable
        .set({name: 'clinics', observable: Observable.fromEvent(this.database.ref('clinics'), 'value')})
        .set({name: 'deals', observable: Observable.fromEvent(this.database.ref('deals'), 'value')});
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
