import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';
import { HttpsProvider } from '../../providers/https/https';
import { ToolsProvider } from '../../providers/tools/tools';
/**
 * Generated class for the AddAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {
  public addressList={
    name:'',
    phone:'',
    address:''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public tools:ToolsProvider,public config:ConfigProvider,public https:HttpsProvider) {
  }

  ionViewDidLoad() {
  }
  addAddress(){
    if (this.addressList.name!=''||this.addressList.address!=''||this.addressList.phone!='') {
      console.log(1);
      let userinfo=this.tools.getUserInfo();
      let json={
        uid:userinfo._id,
        salt:userinfo.salt,
        name:this.addressList.name,
        phone:this.addressList.phone,
        address:this.addressList.address
      }
      let sign=this.tools.sign(json);
      let api='api/addAddress';
      this.https.doPost(api,{
        uid:userinfo._id,
        sign:sign,
        name:this.addressList.name,
        phone:this.addressList.phone,
        address:this.addressList.address
      },(data)=>{
        console.log(data);
        alert(data.message);
        if (data.success==true) {
          this.navCtrl.pop();
        }
      })
    }
    else{
      console.log(2);
      alert('收货地址不对!')
    }
  }

}
