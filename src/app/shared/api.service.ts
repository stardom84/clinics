import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  title = '';

  private heroesUrl = 'app/clinics';  // URL to web api

  get = {
    clinics: (): Observable<model.IClinicDTO[]> => {
      return this.http.get(this.heroesUrl)
                 .map(this.extractData)
                 .catch(this.handleError);
    }
  };

  constructor(
    private http: Http
  ) {

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
