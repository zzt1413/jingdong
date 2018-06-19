import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegsignPage } from '../regsign/regsign';

import { HttpsProvider } from '../../providers/https/https';
import { CookiesProvider } from '../../providers/cookies/cookies';
/**
 * Generated class for the RegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html',
})
export class RegPage {
  public tel='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public https:HttpsProvider,public cookies:CookiesProvider) {
  }

  ionViewDidLoad() {
  }
  goRegsignPage(){
    if (/^\d{11}$/.test(this.tel)) {
      var api='api/sendCode';
      this.https.doPost(api,{'tel':this.tel},(result)=>{
        console.log(result);
        if (result.success) {
          this.cookies.set('reg-tel',this.tel);
          this.navCtrl.push(RegsignPage);
        }
      })
    }
    else{
      alert("请输入正确的手机号码!");
    }
  }
}
