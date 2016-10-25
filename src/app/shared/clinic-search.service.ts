import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ClinicSearchService {
  constructor(private http: Http) {
  }

  search(term: string): Observable<model.IDealDTO[]> {
    return this.http
               .get(`app/deals/?title=${term}`)
      .map((r: Response) => r.json().data as model.IDealDTO[]);
  }
}
