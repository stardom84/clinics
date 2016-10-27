import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class ApiService {
  private firebaseConfig = {
    authDomain: 'popping-fire-4017.firebaseapp.com',
    databaseURL: 'https:///popping-fire-4017.firebaseio.com'
  };

  private baseUrl = 'app';
  private clinicsUrl = `${this.baseUrl}/clinics`;  // URL to web api
  private dealsUrl = `${this.baseUrl}/deals`;  // URL to web api

  public database: any;

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
    firebase.initializeApp(this.firebaseConfig);
    this.database = firebase.database();
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
