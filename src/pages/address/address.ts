import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import { ChangeaddressPage } from '../changeaddress/changeaddress';
import { AddAddressPage } from '../add-address/add-address';

import { ConfigProvider } from '../../providers/config/config';
import { HttpsProvider } from '../../providers/https/https';
import { ToolsProvider } from '../../providers/tools/tools';
/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  public AddAddressPage=AddAddressPage;
  public list=[];
  public userinfo='';

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public tools:ToolsProvider,public config:ConfigProvider,public https:HttpsProvider, public navParams: NavParams) {
    //this.tools.sign();
  }

  ionViewWillEnter() {
    this.userinfo=this.tools.getUserInfo();
    this.getAddress();
  }
  getAddress(){
    let userinfo:any=this.userinfo;
    let json={
      uid:userinfo._id,
      salt:userinfo.salt
    }
    let sign=this.tools.sign(json);
    var api='api/addressList?uid='+userinfo._id+'&sign='+sign;
    this.https.requsetData(api,(data)=>{
      console.log(data);
      if (data.success==true) {
        this.list=data.result;
      }
      else{
        alert(data.message);
      }
    })
  }
  setAddress(id){
    let userinfo:any=this.userinfo;
    let json={
      uid:userinfo._id,
      salt:userinfo.salt,
      id:id
    }
    let sign=this.tools.sign(json);
    let api='api/changeDefaultAddress';
    this.https.doPost(api,{
      uid:userinfo._id,
      sign:sign,
      id:id
    },(data)=>{
      console.log(data);
      alert(data.message);
      if (data.success==true) {
        this.navCtrl.pop();
      }
    })
  }
  delAddress(key,id) {
    const confirm = this.alertCtrl.create({
      title: '确定要删除此收货地址吗？',
      message: '',
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: () => {
            this.delAddressServer(key,id);
          }
        }
      ]
    });
    confirm.present();
  }
  delAddressServer(key,addId){
    let userinfo:any=this.userinfo;
    let json={
      uid:userinfo._id,
      salt:userinfo.salt,
      id:addId
    }
    let sign=this.tools.sign(json);
    var api='api/deleteAddress';
    this.https.doPost(api,{
      uid:userinfo._id,
      sign:sign,
      id:addId
    },(data)=>{
      alert(data.message);
      if (data.success==true) {
        this.list.splice(key,1);
      }
      
    })
  }
  changeAddress(item){
    this.navCtrl.push(ChangeaddressPage,{
      item:item
    });
  }

}
