import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/_index';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private clinics: Observable<model.IClinic[]>;
  private deals: Observable<model.IDeal[]>;

  constructor(private api: ApiService) {
    // Do stuff
  }

  ngOnInit() {}

  trackById(idx: number, item: any) {
    return item.id;
  }

  onSearchDeal(deals: Observable<model.IDeal[]>) {
    this.deals = deals;
  }

}
