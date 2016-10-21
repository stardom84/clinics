import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  title = '';

  private heroesUrl = 'app/clinics';  // URL to web api

  get = {
    clinics: (): Promise<model.IClinicDTO[]> => {
      return this.http.get(this.heroesUrl)
                 .toPromise()
                 .then(response => response.json().data as model.IClinicDTO[])
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
}
