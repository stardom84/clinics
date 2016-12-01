import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/api.service';

@Component({
  selector: 'my-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  constructor(
    private api: ApiService
  ) {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello register');
    this.api.Google.maps.getApi().subscribe(
      google => {
        console.log('google', google);
        google.maps.Map(document.getElementById('map'));
      }
    );
  }
}
