import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  title = 'Clinics';

  createDb() {
    let clinics = [
      {id: '1', name: 'Windstorm'},
      {id: '2', name: 'Bombasto'},
      {id: '3', name: 'Magneta'},
      {id: '4', name: 'Tornado'}
    ];
    return {clinics};
  }
}
