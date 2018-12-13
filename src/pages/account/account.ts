import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { NativeStorage } from '@ionic-native/native-storage';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  logged = false;
  userData: any;
  facebookAccessToken: string;

  // variaveis para modificacao do html
  hideLoginButton = false;

  constructor(public navCtrl: NavController, public fb: Facebook, private firebaseAuthentication: FirebaseAuthentication, private storage: NativeStorage, private toast: Toast) {
    this.updateLoggedStatus();
  }

  facebookLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      // salvar o token de acesso do facebook
      this.facebookAccessToken = res.authResponse.accessToken;
      console.log(this.facebookAccessToken)
      this.storage.setItem("facebookAccessToken", res.authResponse.accessToken);
      
      // salvar os dados do usuario
      this.fb.api('me?fields=id,name,email,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {username: profile['name'], email: profile['email'], picture: profile['picture_large']['data']['url']};
        this.storageUserData(profile['email'], profile['picture_large']['data']['url'], profile['name']);
      });

      //salvar o token de acesso do firebase
      this.firebaseAuthentication.signInWithFacebook(this.facebookAccessToken)
      .then(() => {
        this.logged = true;
        this.hideLoginButton = true;
        this.storage.setItem("logged", "true")
        this.toast.show('Login realizado com sucesso', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      })
      .catch((error: any) => {
        this.toast.show(error , '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    });
  }

  storageUserData(email: string, picture: string, name: string) {
    this.storage.setItem("useremail", email)
    this.storage.setItem("userpicture", picture)
    this.storage.setItem("username", name)
  }

  retrieveUserData() {
    if(!this.logged)
      return;

    this.storage.getItem("username")
    .then((data) => {
      this.userData['username'] = data;
    })

    this.storage.getItem("useremail")
    .then((data) => {
      this.userData['email'] = data;
    })

    this.storage.getItem("userpicture")
    .then((data) =>{
      this.userData['picture'] = data;
    })
  }

  updateLoggedStatus() {
    this.storage.getItem('logged')
    .then(
      data => {
        if(data == "false") {
          console.log(data)
          this.logged = false;
        } else if(data == "true") {
          this.logged = true;
          this.retrieveUserData();
        }
      },
      // primeira vez irá disparar um erro
      error => this.storage.setItem('logged', 'false').then( () => this.logged = false)
    );
  }
}
