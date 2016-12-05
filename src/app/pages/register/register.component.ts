import { Component, OnInit } from '@angular/core';
import { GoogleMapService } from '../../shared/google.map.service';

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
    this.googleMapSrv.createMap(document.getElementById('map'));

    this.googleMapSrv.getGeocodeByClickOb().subscribe(mouseEvent => {
      console.log('getGeocodeByClickOb', mouseEvent);
    });
  }
}
