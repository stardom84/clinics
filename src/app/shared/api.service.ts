import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

let firebaseConfig = {
  apiKey: 'AIzaSyBDpjSEmfLFfflvrt2EUlnVflfxUPCjHEs',
  authDomain: 'popping-fire-4017.firebaseapp.com',
  databaseURL: 'https://popping-fire-4017.firebaseio.com',
  storageBucket: 'popping-fire-4017.appspot.com',
  messagingSenderId: '873328552635'
};

@Injectable()
export class ApiService {

  private baseUrl = 'app';
  private clinicsUrl = `${this.baseUrl}/clinics`;  // URL to web api
  private dealsUrl = `${this.baseUrl}/deals`;  // URL to web api

  public database: firebase.database.Database;

  private observables: {[name: string]: Observable<any>}[] = [];

  get = {
    clinics: (): Observable<model.IClinicDTO[]> => {
      return this.http.get(this.clinicsUrl)
                 .map(this.extractData)
                 .catch(this.handleError);
    },
    deals: (): Observable<model.IDealDTO[]> => {
      return this.http.get(this.dealsUrl)
                 .map(this.extractData)
                 .catch(this.handleError);
    }
  };

  constructor(private http: Http) {
    this.init();
  }

  private init(): void {
    this.initDb();
    this.setObservables([
      {name: 'snapshot', observable: Observable.fromEvent(this.database.ref('streetModels'), 'value')}
    ]);
    this.subscribeObservables();

  }

  private initDb(): void {
    this.database = firebase.initializeApp(firebaseConfig).database();
  }

  private setObservables(obArr: {name: string, observable: Observable<any>}[]): void {
    obArr.forEach(ob => {
      this.observables[ob.name] = ob.observable;
    });

  }

  private subscribeObservables() {
    this.observables['snapshot'].map(snapshot => snapshot.val())
                                .subscribe(snapshotVal => console.log(snapshotVal));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }
}
