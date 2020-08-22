import { Component } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  a=[];
  b=[];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.a.push(new Date().toISOString());
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private backbuttonSubscription: Subscription;

  ngOnInit() {
    const event = fromEvent(document, 'backbutton');
    this.backbuttonSubscription = event.subscribe(async () => {
      const modal = await this.modalCtrl.getTop();
      if (modal) {
        modal.dismiss();
      }
      console.log("test");
      this.b.push(new Date().toISOString());
    });
  }

  ngOnDestroy() {
    this.backbuttonSubscription.unsubscribe();
  }
}
