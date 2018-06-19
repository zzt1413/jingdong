import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpsProvider } from '../../providers/https/https';
import { CookiesProvider } from '../../providers/cookies/cookies';
/**
 * Generated class for the RegpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regpassword',
  templateUrl: 'regpassword.html',
})
export class RegpasswordPage {
  public tel='';
  public code='';
  public passwrod='';
  public rpasswrod='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public https:HttpsProvider,public cookies:CookiesProvider) {
    this.tel=this.cookies.get('reg-tel');
    this.code=this.cookies.get('reg-code');
  }

  ionViewDidLoad() {
  }
  doReg(){
    if(this.passwrod!=this.rpasswrod){
      alert('密码不一致!');
    }
    else if (this.passwrod.length<6||this.rpasswrod.length<6) {
      console.log(this.passwrod.length+'  '+this.rpasswrod.length);
      alert('请输入6位以上的密码!');
    }
    else{
      console.log(this.tel);
      console.log(this.code);
      var api='api/register';
      this.https.doPost(api,{'tel':this.tel,'code':this.code,'passwrod':this.passwrod},(result)=>{
        console.log(1);
        console.log(result)
        if (result.success) {
          this.cookies.set('user-info',result.userinfo[0]);
          this.navCtrl.popToRoot();
        }
        else{
          alert('注册失败！');
        }
      })
    }
  }

}
