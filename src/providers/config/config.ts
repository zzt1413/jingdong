// import { Http,Jsonp } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {
  public apiUrl = 'http://39.108.159.135/';

  constructor() {
    console.log('Hello ConfigProvider Provider');
  }

}
