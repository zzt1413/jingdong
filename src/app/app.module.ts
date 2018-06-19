import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { HttpModule, JsonpModule } from '@angular/http';
import { ComponentsModule } from '../components/components.module';

import { MyApp } from './app.component';

import { AssortmentPage } from '../pages/assortment/assortment';
import { CartPage } from '../pages/cart/cart';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';
//登录
import { LoginPage } from '../pages/login/login';
import { PersonlPage } from '../pages/personl/personl';

//搜索
import { SearchPage } from '../pages/search/search';
//注册
import { RegPage } from '../pages/reg/reg';
import { RegsignPage } from '../pages/regsign/regsign';
import { RegpasswordPage } from '../pages/regpassword/regpassword';
//支付界面
import { OrderPage } from '../pages/order/order';
//收获地址
import { AddressPage } from '../pages/address/address';
import { ChangeaddressPage } from '../pages/changeaddress/changeaddress';
import { AddAddressPage } from '../pages/add-address/add-address';

import { PayPage } from '../pages/pay/pay';

import { NewsPage } from '../pages/news/news';
import { ShoplistPage } from '../pages/shoplist/shoplist';
import { PdetailsPage } from '../pages/pdetails/pdetails';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpsProvider } from '../providers/https/https';
import { ConfigProvider } from '../providers/config/config';
import { CookiesProvider } from '../providers/cookies/cookies';
import { ToolsProvider } from '../providers/tools/tools';

@NgModule({
  declarations: [
    MyApp,
    AssortmentPage,
    CartPage,
    HomePage,
    TabsPage,
    NewsPage,
    UserPage,
    LoginPage,
    RegPage,
    RegsignPage,
    RegpasswordPage,
    SearchPage,
    ShoplistPage,
    PdetailsPage,
    PersonlPage,
    OrderPage,
    AddAddressPage,
    AddressPage,
    ChangeaddressPage,
    PayPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp,{
        tabsHideOnSubPages:'true',
        backButtonText: '返回'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AssortmentPage,
    CartPage,
    HomePage,
    TabsPage,
    NewsPage,
    UserPage,
    LoginPage,
    RegPage,
    RegsignPage,
    RegpasswordPage,
    SearchPage,
    ShoplistPage,
    PdetailsPage,
    PersonlPage,
    OrderPage,
    AddressPage,
    AddAddressPage,
    ChangeaddressPage,
    PayPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpsProvider,
    ConfigProvider,
    CookiesProvider,
    ToolsProvider
  ]
})
export class AppModule {}
