import {Observable} from 'rxjs/Observable';

declare namespace model {
  interface IGoogleApi {
    maps: {
      getApi: () => Observable<any>;
      [key: string]: any;
    };
  }
}
