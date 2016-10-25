import {Component, OnInit, Output} from '@angular/core';
import {ClinicSearchService} from '../../../shared/clinic-search.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {EventEmitter} from '@angular/common/src/facade/async';

@Component({
  selector: 'my-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
  providers: [ClinicSearchService]
})

export class HomeSearchComponent implements OnInit {
  @Output() searchDeal: EventEmitter<Observable<model.IDeal[]>> = new EventEmitter<Observable<model.IDeal[]>>();
  private deals: Observable<model.IDeal[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private clinicSearchService: ClinicSearchService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.deals = this.searchTerms
                     .debounceTime(0)        // wait for 300ms pause in events
                     .distinctUntilChanged()   // ignore if next search term is same as previous
                     .switchMap(term => term   // switch to new observable each time
                       // return the http search observable
                       ? this.clinicSearchService.search(term)
                       // or the observable of empty heroes if no search term
                       : Observable.of<model.IDeal[]>([]))
                     .catch(error => {
                       // TODO: real error handling
                       console.log(error);
                       return Observable.of<model.IDeal[]>([]);
                     });
  }

  search(term: string): void {
    console.log('term', term);
    this.searchTerms.next(term);
    this.searchDeal.emit(this.deals);
    console.log('this.deals', this.deals);
  }
}
