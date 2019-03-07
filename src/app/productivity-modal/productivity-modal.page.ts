import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-productivity-modal',
  templateUrl: './productivity-modal.page.html',
  styleUrls: ['./productivity-modal.page.scss'],
})
export class ProductivityModalPage implements OnInit {

  constructor(public modalController: ModalController, public alertController: AlertController, private storage: Storage ) {
    
   
  }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }

}
