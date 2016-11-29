import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiService} from './_index';
import {AWSError} from 'aws-sdk/lib/error';
import {ScanInput, ScanOutput} from 'aws-sdk/lib/dynamodb/document_client_interfaces';


@Injectable()
export class ClinicSearchService {

  private searchOb: any;

  constructor(
    private Api: ApiService
  ) {
    this.searchOb = Observable.bindCallback((param: ScanInput, cb: (err: AWSError, data: ScanOutput) => void) => {
      this.Api.database.scan(param, cb);
    });
  }

  search(term: string | number) {
    console.log('term', term);
    return this.searchOb(this.createParam(term))
               .map((res: [AWSError, ScanOutput]) => this.onSearch(res));
  }

  private onSearch(res: [AWSError, ScanOutput]) {
    return this.Api.parseAWSOutput(res) as model.IClinic[];
  }

  private createParam(term: string | number): ScanInput {
    let param = {} as ScanInput;

    param.TableName = 'clinic';

    if (term) {
      param.FilterExpression = 'contains(#name, :term)';
      param.ExpressionAttributeNames = {
        '#name': 'name'
      };
      param.ExpressionAttributeValues = {
        ':term': term
      };
    }
    return param;
  };
}
