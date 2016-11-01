import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ObservableService, ApiService} from './_index';

@Injectable()
export class ClinicSearchService {
  private obClinics: Observable<model.IDeal>;

  constructor(
    private Observable: ObservableService,
    private Api: ApiService
  ) {
    this.obClinics = this.Observable.get('clinics');
  }

  search(term: string): Observable < model.IDeal[] > {
    return this.obClinics
               .map((snapshot: any) =>
                 this.Api.extractSnapshot(snapshot) as model.IDeal[]);
  }
}
