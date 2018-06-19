import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';
import { HttpsProvider } from '../../providers/https/https';
/**
 * Generated class for the ShoplistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shoplist',
  templateUrl: 'shoplist.html',
})
export class ShoplistPage {
  public shoplist = [];
  public cid = '';
  public page=1;
  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,public https:HttpsProvider) {
  
    this.cid=this.navParams.get('cid');
    this.getshopList('');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoplistPage');
  }
  getshopList(infiniteScroll){
    var api='api/plist?cid='+this.cid+'&page='+this.page;
    this.https.requsetData(api,(data)=>{
      this.shoplist=this.shoplist.concat(data.result);
      if (infiniteScroll) {
        infiniteScroll.complete();
        if (data.result.length<10) {
          infiniteScroll.enable(false);
        }
      }
      this.page++;
    })
  }
  doMore(infiniteScroll){
    this.getshopList(infiniteScroll);
  }


}
