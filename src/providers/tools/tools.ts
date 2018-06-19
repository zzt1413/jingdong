//import { HttpClient } from '@angular/common/http';
import { Http,Jsonp } from '@angular/http';
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { CookiesProvider } from '../../providers/cookies/cookies';
/*
  Generated class for the ToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToolsProvider {

  constructor(public http: Http,public cookies:CookiesProvider) {
  }
  getUserInfo(){
    var userinfo=this.cookies.get('userinfo');
    if (userinfo) {
      return userinfo;
    }
    else{
      return '';
    }
    

  }
  sign(json){
    var tempArr=[];
    for(let arr in json){
      tempArr.push(arr);
    }
    tempArr=tempArr.sort();
    var tempStr='';
    for(let i=0;i<tempArr.length;i++){
      tempStr+=tempArr[i]+json[tempArr[i]];
    }
    return Md5.hashStr(tempStr);
  }

}
