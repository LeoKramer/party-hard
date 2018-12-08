import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardGamePage } from './card-game';

@NgModule({
  declarations: [
    CardGamePage,
  ],
  imports: [
    IonicPageModule.forChild(CardGamePage),
  ],
})
export class CardGamePageModule {}
