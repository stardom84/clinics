import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AsyncSubject} from 'rxjs/AsyncSubject';
@Injectable()
export class GoogleMapService {

  private api: any;
  private googleMaps: any;
  private mapElement: HTMLElement;
  private apiKey = 'AIzaSyCTrSHR8nxKobRiroiMR65kFUhWx6SzYd0';
  private map: google.maps.Map;

  constructor() {}

  createMap(mapEl: HTMLElement, latLng: google.maps.LatLngLiteral) {
    this.mapElement = mapEl;
    this.getApi().subscribe(
      googleMaps => {
        this.googleMaps = googleMaps;
        this.map = new googleMaps.Map(mapEl, {
          zoom: 12,
          center: new googleMaps.LatLng(latLng.lat, latLng.lng),
          mapTypeId: googleMaps.MapTypeId.ROADMAP
        });
      },
      err => { console.log('err!!', err); },
      () => { console.log('completed'); });
  }

  getGeocodeByClickOb(): (map: any, event: string) => Observable<google.maps.MouseEvent> {
    return this.registerClickToGetGeocode();
  }

  private getApi(language = 'en'): Observable<any> {
    if (this.api) {
      return Observable.of<any>(this.api);
    }

    const callbackName  = '__googleMapsApiOnLoadCallback',
          params        = [],
          subject       = new AsyncSubject(),
          scriptElement = document.createElement('script');

    params.push(`callback=${callbackName}`);
    params.push(`key=${this.apiKey}`);
    params.push(`language=${language}`);

    scriptElement.src = `https://maps.googleapis.com/maps/api/js?${params.join('&')}`;

    window[callbackName] = () => {
      console.log('Calling __googleMapsApiOnLoadCallback...');

      subject.next(window.google.maps);
      subject.complete();

      this.api = window.google.maps;

      delete window[callbackName];
    };

    document.body.appendChild(scriptElement);

    return subject;
  }

  private registerClickToGetGeocode(): (map: any, event: string) => Observable<google.maps.MouseEvent> {
    const onClickMapOb = Observable.bindCallback((event: string, cb: () => any) => {
      this.googleMaps.event.addListener(this.map, event, cb);
    });

    let eventLike = (event: string) => onClickMapOb(event);

    Observable.fromEvent(eventLike, 'click').subscribe(mouseEvent => {
      console.log(mouseEvent);
    });

    return onClickMapOb;
  }
}
