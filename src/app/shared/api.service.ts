import {Injectable} from '@angular/core';
import * as AWS from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {AttributeMap, ScanOutput} from 'aws-sdk/lib/dynamodb/document_client_interfaces';
import {AWSError} from 'aws-sdk/lib/error';
import {Http} from '@angular/http';


// FIXME: don't use hard coded credentials
let dynamoDBConf = {
  region: 'ap-southeast-1',
  credentials: {
    'accessKeyId': 'AKIAIHOLVZEFHHX245DQ',
    'secretAccessKey': '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'
  }
};

@Injectable()
export class ApiService {

  public database: DocumentClient;
  public Google: model.IGoogleApi;

  constructor(private http: Http) {
    this.init();
  }


  parseAWSOutput(res: [AWSError, ScanOutput]) {
    let err: AWSError = res[0],
      data: ScanOutput = res[1],
      result: AttributeMap[] = [];

    if (err) {
      console.log(err);
      console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2), err);
      return null;
    } else {

      console.log('GetItem succeeded:', data);

      data.Items.forEach(function (item) {
        console.log('item', item);
        result.push(item);
      });

      return result;
    }
  }

  private init(): void {
    this.initDb();
    this.initGoogleApi();
  }

  private initDb(): void {
    AWS.config.update(dynamoDBConf);
    this.database = new AWS.DynamoDB.DocumentClient();
  }

  private initGoogleApi(): void {
    this.Google = {
      maps: {
        getApi: () => this.http.get('http://maps.google.com/maps/api/js')
      }
    };
  }
}
