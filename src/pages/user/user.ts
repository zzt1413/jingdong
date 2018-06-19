import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegPage } from '../reg/reg';
import { PersonlPage } from '../personl/personl';

import { CookiesProvider } from '../../providers/cookies/cookies';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public LoginPage = LoginPage;
  public RegPage = RegPage;
  public isLogin=false;
  public userinfo='';
  public PersonlPage=PersonlPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public cookies:CookiesProvider) {
  }

  ionViewDidLoad() {
  }
  ionViewWillEnter(){
    console.log(this.userinfo)
    var userinfo=this.cookies.get('userinfo');
    if (userinfo&&userinfo.username) {
      this.userinfo=userinfo;
    }
    else{
      this.userinfo='';
    }
  }

}
