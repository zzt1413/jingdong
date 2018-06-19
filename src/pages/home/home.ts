import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { NewsPage } from '../news/news';
import { PdetailsPage } from '../pdetails/pdetails';

import { ConfigProvider } from '../../providers/config/config';
import { HttpsProvider } from '../../providers/https/https';

import { Http,Jsonp } from '@angular/http';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public PdetailsPage=PdetailsPage;
  public fList = [];
  public rList = [];
  public rWidth = "";
  public hList = [];
  constructor(public navCtrl: NavController,public jsonp:Jsonp,public config:ConfigProvider,public https:HttpsProvider) {
    this.getFocus();

    //调用精品推荐
    this.getBestProduct();

    //调用猜你喜欢

    this.getHotProduct();


   
  }
  //定义一个跳转到搜索页面的方法
  goSearch(){

    this.navCtrl.push(SearchPage);
  }
  //轮播图
  getFocus(){ 
    var that=this;
    
    this.https.requsetData('api/focus',function(data){
       console.log(data);
        that.fList=data.result;
    })
  }

 //精品推荐

 getBestProduct(){

   // http://39.108.159.135/api/plist?is_best=1

    this.https.requsetData('api/plist?is_best=1',(data)=>{
      console.log(data);
        this.rList=data.result;
        this.rWidth=this.rList.length*92+'px'; 
    })
 }
 //猜你喜欢

 getHotProduct(){
  
      //http://39.108.159.135/api/plist?is_hot=1  
      this.https.requsetData('api/plist?is_hot=1',(data)=>{
        // console.log(data);
          this.hList=data.result;            
        
      })
  
   }


}
