import { Component } from '@angular/core';

import { GamesPage } from '../games/games';
import { AccountPage } from '../account/account';
import { RequestsPage } from '../requests/requests';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GamesPage;
  tab2Root = AccountPage;
  tab3Root = RequestsPage;

  tabsState = false;

  constructor() {

  }
}
