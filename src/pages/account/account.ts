import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(public navCtrl: NavController, public fb: Facebook) {

  }

  facebookLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    .catch(e => console.log('Error logging into Facebook', e));
  }
  
}
