import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';

import { OrderPage } from '../order/order';

import { ConfigProvider } from '../../providers/config/config';
import { HttpsProvider } from '../../providers/https/https';
import { CookiesProvider } from '../../providers/cookies/cookies';
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  public list=[];
  public allPrice=0;
  public isChecked=false;
  public isEnd=false;
  public hasData=true;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public config:ConfigProvider,public cookies:CookiesProvider,public https:HttpsProvider) {

  }
  ionViewDidEnter(){
    this.getCarts();
    this.sumPrice();
    this.updateCart();
  }

  ionViewDidLeave(){
    this.cookies.set('carts_data',this.list);
  }

  getCarts(){
    var cokData=this.cookies.get('carts_data');
    if (cokData && cokData.length>0) {
      this.list=cokData;
      this.hasData=true;
    }
    else{
      this.list=[];
      this.hasData=false;
    }
  }
  decCnum(item){
    if (item.product_count>1) {
      --item.product_count;
    }
    this.sumPrice();
  }
  incCnum(item){
    ++item.product_count;
    this.sumPrice();
  }
  updateCart(){
    if (this.list.length==this.getChecked() && this.list.length>0) {
      this.isChecked=true;
    }
    else{
      this.isChecked=false;
    }
    this.sumPrice();
  }
  sumPrice(){
    var tempAllPrice=0;
    for(let i=0;i<this.list.length;i++){
      if (this.list[i].checked==true) {
        tempAllPrice+=this.list[i].product_count*this.list[i].product_price;
      }
    }
    this.allPrice=tempAllPrice;
  }
  payCart(){
    var tempArr=[];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].checked==true) {
        tempArr.push(this.list[i]);
      }
    }
    if (tempArr.length>0) {
      this.cookies.set('order_data',tempArr);
      this.navCtrl.push(OrderPage,{
        allPrice:this.allPrice
      });
    }
    else{
      const alert = this.alertCtrl.create({
        title: '请选择商品',
        subTitle: '您还未选择商品！',
        buttons: ['确定']
      });
      alert.present();
    }
    
  }
  allCheck(){
    if (this.isChecked==true) {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].checked=false;
      }
      this.isChecked=false;
    }
    else{
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].checked=true;
      }
      this.isChecked=true;
    }
  }
  getChecked(){
    var sum=0;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].checked==true) {
        sum+=1;
      }
    }
    return sum;
  }
  delCart(){
    var delArr=[];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].checked==false) {
        delArr.push(this.list[i]);
      }
    }
    this.list=delArr;
    this.list.length>0?this.hasData=true:this.hasData=false;
    this.cookies.set('carts_data',delArr);
  }
}
