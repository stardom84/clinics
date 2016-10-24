import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClinicSearchService {
  constructor(private http: Http) {
  }

  search(term: string): Observable<model.IClinic[]> {
    return this.http
      .get(`app/clinics/?name=${term}`)
      .map((r: Response) => r.json().data as model.IClinic[]);
  }
}
