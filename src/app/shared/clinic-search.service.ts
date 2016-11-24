import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import {ApiService} from './_index';

@Injectable()
export class ClinicSearchService {

  constructor(
    private Api: ApiService
  ) {}

  search(term: string): Observable < model.IDeal[] > {
    return Observable.fromEvent(this.Api.database.ref('deals')
                                    .orderByChild('title')
                                    .startAt(term, 'title'), 'value')
                     .map((snapshot: any) => {
                       console.log('snapshot', this.Api.extractSnapshot(snapshot));
                       return this.Api.extractSnapshot(snapshot) as model.IDeal[];
                     });
  }
}
