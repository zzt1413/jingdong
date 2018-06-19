// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';

/*
  Generated class for the CookiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CookiesProvider {

  constructor(public http: Http) {
  }
  set(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  }
  get(key){
    return JSON.parse(localStorage.getItem(key));
  }
  remove(key){
    localStorage.removeItem(key);
  }

}
