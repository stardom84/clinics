import {Component, OnInit} from '@angular/core';
import {GoogleMapService} from '../../shared/google.map.service';

@Component({
  selector: 'my-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  constructor(
    private googleMapSrv: GoogleMapService
  ) {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello register');
    this.googleMapSrv.getApi().subscribe((googleMaps) => {
        console.log('googleMaps', googleMaps);
        const maps = new googleMaps.Map(document.getElementById('map'), {
          zoom: 12,
          center: new googleMaps.LatLng(37.49736948554443, 127.02452659606933),
          mapTypeId: googleMaps.MapTypeId.ROADMAP
        });
      },
      (err) => {
        console.log('err!!', err);
      },
      () => {
        console.log('completed');
      }
  }
}
