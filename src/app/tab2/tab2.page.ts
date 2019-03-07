import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ProductivityModalPage } from '../productivity-modal/productivity-modal.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public navCtrl: NavController, public modalController: ModalController, private storage: Storage){
    
  }

  async logProductivity() {
    const modal = await this.modalController.create({
      component: ProductivityModalPage,
      componentProps: { 
      }
    });

    modal.onDidDismiss()
      .then((data) => {
          
    });

    await modal.present(); 

  }

}
