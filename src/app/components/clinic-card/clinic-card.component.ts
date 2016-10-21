import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'my-clinic-card',
  templateUrl: './clinic-card.component.html',
  styleUrls: ['./clinic-card.component.scss']
})
export class ClinicCardComponent implements OnInit {

  @Input()
  private clinic: model.IClinic;

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello clinic card');
  }

}
