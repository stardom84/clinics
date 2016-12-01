import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AsyncSubject} from 'rxjs/AsyncSubject';
@Injectable()
export class GoogleMapService {

  private api: any;
  private apiKey = 'AIzaSyCTrSHR8nxKobRiroiMR65kFUhWx6SzYd0';

  constructor() {}

  public getApi(): Observable<any> {
    if (this.api) {
      return Observable.of<any>(this.api);
    }

    const callbackName = '__googleMapsApiOnLoadCallback';
    const subject = new AsyncSubject();
    const params = [`callback=${callbackName}`];
    params.push(`key=${this.apiKey}`);
    const scriptElement = document.createElement('script');

    scriptElement.src = `https://maps.googleapis.com/maps/api/js?${params.join('&')}`;

    window[callbackName] = () => {
      console.log('calling cb..');
      subject.next(window.google.maps);
      subject.complete();
      this.api = window.google.maps;
      delete window[callbackName];
    };

    document.body.appendChild(scriptElement);

    return subject;
  }
}