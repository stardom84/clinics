import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/bindCallback';
import {ApiService} from './_index';
import {AWSError} from 'aws-sdk/lib/error';
import {ScanInput, ScanOutput} from 'aws-sdk/lib/dynamodb/document_client_interfaces';


@Injectable()
export class ClinicSearchService {

  private searchOb: (params: ScanInput) => Observable<AWSError, ScanOutput>;

  constructor(
    private Api: ApiService
  ) {
    this.searchOb = Observable.bindCallback(this.Api.database.scan);
  }

  search(term: string) {
    // this.Api.database.scan(this.createParam(term), this.onSearch);

    return this.searchOb(this.createParam(term))
               .map(this.onSearch);
  }

  private onInit() {
    this.searchOb = Observable.bindCallback(this.Api.database.scan);
  }

  private onSearch(err: AWSError, data: DynamoDB.Types.ScanOutput) {
    if (err) {
      console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('GetItem succeeded:', data);

      return this.Api.extractAWSOutput(data) as model.IClinic[];
    }
  }

  private createParam(term: string): Object {
    return {
      TableName: 'clinic',
      FilterExpression: 'contains(#name, :term)',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: {
        ':term': term
      }
    };
  };
}
