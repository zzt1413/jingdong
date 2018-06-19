import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CookiesProvider } from '../../providers/cookies/cookies';
/**
 * Generated class for the PersonlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personl',
  templateUrl: 'personl.html',
})
export class PersonlPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public cookies:CookiesProvider) {
  }

  ionViewDidLoad() {
  }
  loginOut(){

    this.cookies.remove('userinfo');
    this.navCtrl.popToRoot();

  }

}
