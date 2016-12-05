import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AsyncSubject } from 'rxjs/AsyncSubject';
@Injectable()
export class GoogleMapService {

  private api: any;
  private mapElement: HTMLElement;
  private apiKey = 'AIzaSyCTrSHR8nxKobRiroiMR65kFUhWx6SzYd0';
  private map: google.maps.Map;
  private userCoords: Position;
  private clickMapStream: Observable<Event>;
  private mapBindCallback: (event: string) => Observable<google.maps.MouseEvent>;
  private mapCallbackStream: Observable<google.maps.MouseEvent>;

  constructor() {
  }

  createMap(mapEl: HTMLElement, language?: string) {
    this.mapElement = mapEl;

    this.getMyLocation()
        .mergeMap((position: Position) => this.getApi(language).map(() => position))
        .subscribe(
          position => {
            this.map = new this.api.Map(mapEl, {
              zoom: 12,
              center: new this.api.LatLng(position.coords.latitude, position.coords.longitude),
              mapTypeId: this.api.MapTypeId.ROADMAP
            });
          },
          err => {
            console.log('err!!', err);
          },
          () => {
            console.log('completed');
          });


    return this;
  }

  getGeocodeByClickOb(): Observable<google.maps.MouseEvent> {
    this.setMapClickStream()
        .setMapCallback()
        .bindMapClickToCallback();

    return this.mapCallbackStream;
  }

  getMyLocation(): Observable<Position> {
    const subscription = new Subject();
    const bindCallback = Observable.bindCallback((success: () => any) => {
      navigator.geolocation.getCurrentPosition(success);
    });

    bindCallback()
      .subscribe((position: Position) => {
        this.userCoords = position;
        subscription.next(position);
      });

    return subscription;
  }

  private getApi(language = 'en'): Observable<any> {
    if (this.api) {
      return Observable.of<any>(this.api);
    }

    const callbackName  = '__googleMapsApiOnLoadCallback',
          params        = [],
          subscription = new AsyncSubject(),
          scriptElement = document.createElement('script');

    params.push(`callback=${callbackName}`);
    params.push(`key=${this.apiKey}`);
    params.push(`language=${language}`);

    scriptElement.src = `https://maps.googleapis.com/maps/api/js?${params.join('&')}`;

    window[callbackName] = () => {
      console.log('Calling __googleMapsApiOnLoadCallback...');

      this.api = window['google'].maps;

      subscription.next(true);
      subscription.complete();

      delete window[callbackName];
    };

    document.body.appendChild(scriptElement);

    return subscription;
  }

  private setMapClickStream() {
    this.clickMapStream = Observable.fromEvent(this.mapElement, 'click')
                                    .map(e => e);
    return this;
  }

  private setMapCallback() {
    this.mapBindCallback = Observable.bindCallback((event: string, cb: () => any) => {
      this.api.event.addListener(this.map, event, cb);
    });

    return this;
  }

  private bindMapClickToCallback() {
    this.mapCallbackStream = this.clickMapStream
                                 .mergeMap(() => this.mapBindCallback('click'));
  }
}
