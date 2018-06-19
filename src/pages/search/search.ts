import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content,AlertController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';
import { HttpsProvider } from '../../providers/https/https';
import { CookiesProvider } from '../../providers/cookies/cookies';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild(Content) content:Content;

  public flag = false;
  public sList = [];
  public keywrod = '';
  public searchpage=1;
  public datas=true;
  public historyList=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,public https:HttpsProvider,public cookies:CookiesProvider,public alertCtrl:AlertController) {
    // this.getSearchList('');
    this.getHistory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  getSearchList(infiniteScroll){
    if (!infiniteScroll) {
      this.searchpage=1;
      this.datas=true;
      this.content.scrollToTop(0);
      this.saveHistory();
    }

    var api='api/plist?search='+this.keywrod+'&page='+this.searchpage;
    this.https.requsetData(api,(data)=>{
      if (this.searchpage==1) {
        this.sList=data.result;
      }
      else{
        this.sList=this.sList.concat(data.result);
       
      }
      this.flag=true;

      if (infiniteScroll) {
        infiniteScroll.complete();
        if (data.result.length<10) {
          this.datas=false;
        }
      }
      this.searchpage++;
    })
  }

  goSearch(keywrod){
    this.keywrod=keywrod;
    this.getSearchList('');
  }

  doSeaMore(infiniteScroll){
    this.getSearchList(infiniteScroll);
  }
  saveHistory(){
    var history=this.cookies.get('hisData');
    if (history) {
      if (history.indexOf(this.keywrod)==-1) {
        history.unshift(this.keywrod);
        this.cookies.set('hisData',history);
      }
    }
    else{
      this.historyList.unshift(this.keywrod);
      this.cookies.set('hisData',this.historyList);
    }

  }
  getHistory(){
    var history=this.cookies.get('hisData');
    if (history) {
      this.historyList=history;
    }
  }
  goDelete(keywrod){
    let confirm=this.alertCtrl.create({
      title:'您确定要删除历史记录吗？',
      message:'',
      buttons: [{
        text:'取消',
        handler:()=>{
        }
      },
      {
        text:'确定',
        handler:()=>{
          var index=this.historyList.indexOf(keywrod);
          this.historyList.splice(index,1);
          this.cookies.set("hisData",this.historyList);

        }
      }]
    });
    confirm.present();
  }

}
