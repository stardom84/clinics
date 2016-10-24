import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private clinics: Observable<model.IClinic[]>;

  constructor(private api: ApiService) {
    // Do stuff
  }

  ngOnInit() {
    this.clinics = this.api.get.clinics();
    console.log('Hello Home');
  }

  trackByClinicId(idx: number, clinic: model.IClinic) {
    return clinic.id;
  }

  onSearchClinic(clinics: Observable<model.IClinic[]>) {
    this.clinics = clinics;
  }

}
