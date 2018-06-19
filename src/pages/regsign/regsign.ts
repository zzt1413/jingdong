import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegpasswordPage } from '../regpassword/regpassword';

import { HttpsProvider } from '../../providers/https/https';
import { CookiesProvider } from '../../providers/cookies/cookies';
/**
 * Generated class for the RegsignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regsign',
  templateUrl: 'regsign.html',
})
export class RegsignPage {
  public code;
  public showBtn = true;
  public num=60;
  public tel='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public https:HttpsProvider,public cookies:CookiesProvider) {
    this.tel=this.cookies.get('reg-tel');
  }

  ionViewDidLoad() {
    this.doTimer();
  }
  doTimer(){
    // var timer=setInterval(()=>{
    //   --this.num;
    //   if (this.num==0) {
    //     clearInterval();
    //     this.showBtn=false;
    //   }
    // },1000)
  }
  goRegpasswordPage(){
    var api='api/validateCode';
    this.https.doPost(api,{'tel':this.tel,'code':this.code},(result)=>{
      this.cookies.set('reg-code',this.code);
      if (result.success) {
        this.navCtrl.push(RegpasswordPage);
      }
      else{
        alert('请输入正确的验证码！');
      }
    })
  }
  sendAgain(){
    var api='api/sendCode';
    this.https.doPost(api,{'tel':this.tel},(result)=>{
      if (result.success) {
        this.doTimer();
        this.num=60;
        this.showBtn=true;
      }
    })

  }

}
