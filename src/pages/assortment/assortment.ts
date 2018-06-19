import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ShoplistPage } from '../shoplist/shoplist';

import { ConfigProvider } from '../../providers/config/config';
import { HttpsProvider } from '../../providers/https/https';

@Component({
  selector: 'page-assortment',
  templateUrl: 'assortment.html'
})
export class AssortmentPage {

  public aListLeft = [];
  public aListRight = [];
  public ShoplistPage=ShoplistPage;
  constructor(public navCtrl: NavController,public config:ConfigProvider,public https:HttpsProvider) {

    this.getaListLeft();
  }

  getaListLeft(){
    var api = 'api/pcate';
    this.https.requsetData(api,(data)=>{
      this.aListLeft = data.result;
      this.getaListRight(this.aListLeft[0]["_id"]);
    })
  }
  getaListRight(pid){
    var api = 'api/pcate?pid='+pid;
    this.https.requsetData(api,(data)=>{
      this.aListRight = data.result;

    })
  }
}
