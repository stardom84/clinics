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
    this.googleMapSrv.createMap(document.getElementById('map'), {lat: 37.49736948554443, lng: 127.02452659606933});

    this.googleMapSrv.getGeocodeByClickOb()
  }
}
