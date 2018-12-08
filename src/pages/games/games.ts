import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CardGamePage } from '../card-game/card-game';

@Component({
  selector: 'page-games',
  templateUrl: 'games.html'
})
export class GamesPage {

  constructor(public navCtrl: NavController) {

  }

  goToCardsGame() {
    this.navCtrl.push(CardGamePage);
  }
}
