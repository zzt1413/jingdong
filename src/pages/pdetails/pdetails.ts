import { Component,ViewChild,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';
import { HttpsProvider } from '../../providers/https/https';
import { CookiesProvider } from '../../providers/cookies/cookies';
import { CartPage } from '../cart/cart';

/**
 * Generated class for the PdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdetails',
  templateUrl: 'pdetails.html',
})
export class PdetailsPage {
  @ViewChild('myattr') myattr:ElementRef;

  public CartPage=CartPage;
  public tabs='shop';
  public item=[];
  public num=1;
  public cartnum=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public cookies:CookiesProvider,public config:ConfigProvider,public https:HttpsProvider) {
    this.requestData(this.navParams.data.id);
  }

  ionViewDidLoad() {
    this.bindEvent();
  }
  ionViewDidEnter(){
    this.cartnum=this.getCart();
  }
  requestData(id){
    var api='api/pcontent?id='+id;
    this.https.requsetData(api,(data)=>{
      this.item=data.result;
    })
  }
  bindEvent(){
    var attrDom=this.myattr.nativeElement;
    attrDom.onclick=function(e){
      if (e.srcElement.nodeName=='SPAN') {
        var ele=e.target;
        var parentNode=ele.parentNode;
        var children=parentNode.children;
        for (let i = 0; i < children.length; i++) {
          children[i].className='';
        }
        ele.className='active';
      }
    }
  }
  decnum(){
    if (this.num>1) {
      --this.num;
    }
    
  }
  incnum(){
    ++this.num;
  }
  addCart(){
    var product_title=this.item['title'];
    var product_id=this.item['_id'];
    var product_price=this.item['price'];
    var product_pic=this.item['pic'];
    var product_count=this.num;
    var product_attr='';
    var activedom=document.querySelectorAll('#myattr .active');
    for(let i=0;i<activedom.length;i++){
      product_attr+=activedom[i].innerHTML;
    }
    var json={
      product_title,
      product_id,
      product_price,
      product_pic,
      product_count,
      product_attr,
      checked:true
    }
    var cokData=this.cookies.get('carts_data');
    if (cokData) {
      if (this.hasData(cokData,json.product_id)) {
        for (let i = 0; i < cokData.length; i++) {
          if (cokData[i].product_id==product_id) {
            cokData[i].product_count+=this.num;
          }
        }
      }
      else{
        cokData.push(json);
      }
      this.cookies.set('carts_data',cokData);
      
    }
    else{
      var tempArr=[];
      tempArr.push(json);
      this.cookies.set('carts_data',tempArr);
    }
    this.cartnum+=json.product_count;
  }
  hasData(cokData,product_id){
    if (cokData) {
      for (let i = 0; i < cokData.length; i++) {
        if (cokData[i].product_id==product_id) {
          return true;
        }
        
      }
    }
    return false;
  }
  getCart(){
    var num=0;
    var cokData=this.cookies.get('carts_data');
    if (cokData) {
      for(let i=0;i<cokData.length;i++){
        num+=cokData[i].product_count;
      }
    }
    return num;
  }

}
