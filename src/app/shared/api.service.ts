import {Injectable} from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as AWS from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {AttributeMap, ScanOutput} from 'aws-sdk/lib/dynamodb/document_client_interfaces';

/*let firebaseConfig = {
 apiKey: 'AIzaSyBb5BAKWzefQHM65bn-2iUohqJvyXC347s',
 authDomain: 'clinics-45581.firebaseapp.com',
 databaseURL: 'https://clinics-45581.firebaseio.com',
 storageBucket: 'clinics-45581.appspot.com',
 messagingSenderId: '252734030713'
 };*/

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

  constructor() {
    this.init();
  }


  extractAWSOutput(data: ScanOutput): any {

    let result: AttributeMap[] = [];

    data.Items.forEach(function (item) {
      result.push(item);
    });

    return result;
  }

  private init(): void {
    this.initDb();
  }

  private initDb(): void {
    AWS.config.update(dynamoDBConf);
    this.database = new AWS.DynamoDB.DocumentClient();
  }
}
