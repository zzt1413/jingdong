// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http,Jsonp,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfigProvider } from '../../providers/config/config';
/*
  Generated class for the HttpsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpsProvider {
  private headers =new Headers({'Content-Type':'application/json'});

  constructor(public http: Http,public config:ConfigProvider,public jsonp:Jsonp) {
    console.log('Hello HttpsProvider Provider');
  }
  
  requsetData(apiUrl,callback){
    if (apiUrl.indexOf('?')==-1) {
      var api = this.config.apiUrl+apiUrl+'?callback=JSONP_CALLBACK'
    } else {
      var api = this.config.apiUrl+apiUrl+'&callback=JSONP_CALLBACK'
    }
    this.jsonp.get(api).subscribe(function(data){
      callback(data['_body']);
    },function(err){
    })
  }
  doPost(apiUrl,json,callback){
    var api=this.config.apiUrl+apiUrl;
    this.http.post(api,JSON.stringify(json),{headers:this.headers}).subscribe(function(res){
      callback(res.json());
    })
  }
}
