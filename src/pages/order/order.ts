import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AddressPage } from '../address/address';
import { PayPage } from '../pay/pay';

import { ConfigProvider } from '../../providers/config/config';
import { HttpsProvider } from '../../providers/https/https';
import { CookiesProvider } from '../../providers/cookies/cookies';
import { ToolsProvider } from '../../providers/tools/tools';
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  public LoginPage=LoginPage;
  public AddressPage=AddressPage;
  public list=[];
  public userinfo='';
  public address='';
  public allPrice=0;
  public word='';

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public tools:ToolsProvider,public config:ConfigProvider, public navParams: NavParams,public cookies:CookiesProvider,public https:HttpsProvider) {
  }

  ionViewWillEnter(){
    this.allPrice=this.navParams.get('allPrice');
    this.userinfo=this.tools.getUserInfo();
    this.list=this.cookies.get('order_data');
    if (this.userinfo) {
      this.getDefault();
    }
    else{
      this.userinfo='';
    }
  }
  getDefault(){
    let userinfo:any=this.userinfo;
    let json={
      uid:userinfo._id,
      salt:userinfo.salt,
    }
    let sign=this.tools.sign(json);
    var api='api/oneAddressList?uid='+userinfo._id+'&sign='+sign;
    this.https.requsetData(api,(data)=>{
      console.log(data);
      if (data.success==true) {
        this.address=data.result[0];
      }
      else{
        this.address='';
      }
    })
  }
  doPay(){
    if (!this.userinfo) {
      const confirm = this.alertCtrl.create({
        title: '您还没有登录',
        message: '是否登录',
        buttons: [
          {
            text: '取消',
            handler: () => {
            }
          },
          {
            text: '确定',
            handler: () => {
              this.navCtrl.push(LoginPage);
            }
          }
        ]
      });
      confirm.present();
    }
    else if (!this.address) {
      const alert = this.alertCtrl.create({
        title: '您还没有选择收货地址!',
        subTitle: '请选择!',
        buttons: ['确定']
      });
      alert.present();
    }
    else{
      let userinfo:any=this.userinfo;  
      var uid:any=userinfo['_id'];
      var address:any=this.address['address'];
      var phone:any=this.address['phone'];
      var name:any=this.address['name'];
      var all_price=this.allPrice;
      var products:any=JSON.stringify(this.list);

      let json={
        uid:userinfo._id,
        salt:userinfo.salt,
        address:address,
        phone:phone,
        name:name,
        all_price:all_price
      }
      let sign=this.tools.sign(json);
      var api='api/doOrder';
      this.https.doPost(api,{
        uid:userinfo._id,
        salt:userinfo.salt,
        address:address,
        phone:phone,
        name:name,
        all_price:all_price,
        sign:sign,
        products:products
      },(data)=>{
        console.log(data)
        if (data.success==true) {
          this.navCtrl.push(PayPage);
        }
      })
    }
    
  }

}
