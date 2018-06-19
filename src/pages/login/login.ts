import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpsProvider } from '../../providers/https/https';
import { CookiesProvider } from '../../providers/cookies/cookies';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public history='';
  public userinfo={
    username:'',
    passwrod:''
  } 

  constructor(public navCtrl: NavController, public navParams: NavParams,public cookies:CookiesProvider,public https:HttpsProvider) {
    this.history=this.navParams.get('history');
  }

  ionViewDidLoad() {
  }
  
  doLogin(){
    if (this.userinfo.username.length<5) {
      alert('用户名不存在！');
    }
    else{
      var api='api/doLogin';
      this.https.doPost(api,this.userinfo,(data)=>{
        console.log(data);
        if (data.success) {
          this.cookies.set('userinfo',data.userinfo[0]);
          console.log(data.userinfo[0]);
          if (this.history=='order') {
            this.navCtrl.pop();
          }
          this.navCtrl.popToRoot();
        }

      })
    }
    
  }

}
