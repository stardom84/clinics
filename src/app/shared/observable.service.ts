import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ObservableService {
  private observables: {[name: string]: Observable<any>} = {};

  constructor() {
  }

  get(name: string): Observable<any> {
    return this.observables[name];
  }

  set(ob: {name: string, observable: Observable<any>}): this {
    this.observables[ob.name] = ob.observable;
    return this;
  }
}
