import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/api.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private clinics: model.IClinic[];

  constructor(private api: ApiService) {
    // Do stuff
  }

  async ngOnInit() {
    this.clinics = await this.api.get.clinics();
    console.log('Hello Home');
  }

  private trackByClinicId(idx: number, clinic: model.IClinic) {
    return clinic.id;
  }

}
