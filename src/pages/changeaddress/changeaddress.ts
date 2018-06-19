import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpsProvider } from '../../providers/https/https';
import { ToolsProvider } from '../../providers/tools/tools';
/**
 * Generated class for the ChangeaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changeaddress',
  templateUrl: 'changeaddress.html',
})
export class ChangeaddressPage {
  public addressList:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public tools:ToolsProvider,public https:HttpsProvider) {
  }

  ionViewWillEnter() {
    this.addressList=this.navParams.get('item');
  }
  changeAddress(){
    if (this.addressList.name!=''||this.addressList.address!=''||this.addressList.phone!='') {
      let userinfo=this.tools.getUserInfo();
      let json={
        id:this.addressList._id,
        uid:userinfo._id,
        salt:userinfo.salt,
        name:this.addressList.name,
        phone:this.addressList.phone,
        address:this.addressList.address
      }
      let sign=this.tools.sign(json);
      let api='api/editAddress';
      this.https.doPost(api,{
        id:this.addressList._id,
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
      alert('收货地址不对!')
    }
  }

}
