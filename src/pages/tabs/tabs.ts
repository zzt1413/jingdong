import { Component } from '@angular/core';

import { AssortmentPage } from '../assortment/assortment';
import { CartPage } from '../cart/cart';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AssortmentPage;
  tab3Root = CartPage;
  tab4Root = UserPage;

  constructor() {

  }
}
