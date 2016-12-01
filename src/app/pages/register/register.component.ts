import {Component, OnInit} from '@angular/core';
import {GoogleMapService} from '../../shared/google.map.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'my-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  private googleMaps: any;
  private map: any;
  private onClickMapOb: (map: any, event: string) => Observable<{}>;

  constructor(
    private googleMapSrv: GoogleMapService
  ) {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello register');
    this.createMap();
  }

  private createMap() {
    this.googleMapSrv.getApi().subscribe(googleMaps => {
        this.googleMaps = googleMaps;
        this.map = new googleMaps.Map(document.getElementById('map'), {
          zoom: 12,
          center: new googleMaps.LatLng(37.49736948554443, 127.02452659606933),
          mapTypeId: googleMaps.MapTypeId.ROADMAP
        });
        console.log('this.map', this.map);
        this.addEventListenerOnMap();
      },
      (err) => {
        console.log('err!!', err);
      },
      () => {
        console.log('completed');
      });
  }

  private addEventListenerOnMap() {
    this.onClickMapOb = Observable.bindCallback((map: any, event: string, cb: () => any) => {
      this.googleMaps.event.addListener(map, event, cb);
    });

    this.onClickMapOb(this.map, 'click').subscribe(this.onClickMap);
  }

  private onClickMap(mouseEvent: any) {
    console.log('mouseEvent', mouseEvent);
    return mouseEvent;
  }
}
