import {Component, OnInit, Output} from '@angular/core';
import {ClinicSearchService} from '../../shared/clinic-search.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {EventEmitter} from '@angular/common/src/facade/async';

@Component({
  selector: 'my-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
  providers: [ClinicSearchService]
})

export class HomeSearchComponent implements OnInit {
  @Output() searchClinic: EventEmitter<Observable<model.IClinic[]>> = new EventEmitter<Observable<model.IClinic[]>>();
  private clinics: Observable<model.IClinic[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private clinicSearchService: ClinicSearchService
  ) {
  }

  ngOnInit(): void {
    this.clinics = this.searchTerms
                       .debounceTime(300)        // wait for 300ms pause in events
                       .distinctUntilChanged()   // ignore if next search term is same as previous
                       .switchMap(term => {
                         return term   // switch to new observable each time
                           // return the http search observable
                           ? this.clinicSearchService.search(term)
                           // or the observable of empty heroes if no search term
                           : Observable.of<model.IClinic[]>([]);
                       })
                       .catch(error => {
                         // TODO: real error handling
                         console.log(error);
                         return Observable.of<model.IClinic[]>([]);
                       });
  }

  search(term: string): void {
    this.searchTerms.next(term);
    this.searchClinic.emit(this.clinics);
  }
}
