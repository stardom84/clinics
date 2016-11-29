import {Component, OnInit} from '@angular/core';
import {Input} from '@angular/core/src/metadata/directives';

@Component({
  selector: 'my-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Input() private sidenav;

  ngOnInit() {
    console.log('Home Search');
  }
}
