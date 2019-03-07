import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-finance-modal',
  templateUrl: './finance-modal.page.html',
  styleUrls: ['./finance-modal.page.scss'],
})
export class FinanceModalPage implements OnInit {
  type: any;
  cashAmount: any;
  datePicked: any;
  itemName: any;
  
  hideAmount: any;
  hideName: any;
  hideDate: any;

  constructor(public modalController: ModalController, public alertController: AlertController, private storage: Storage ) {
    
   
  }

  ngOnInit() {

  }

  onChange(type){
    if(type == 'card'){
      this.hideAmount = 1;
      this.hideName = 0;
      this.hideDate = 0;
    }
    if(type == 'payment'){
      this.hideAmount = 0;
      this.hideName = 0;
      this.hideDate = 0;
    }
    if(type == 'income'){
      this.hideAmount = 0;
      this.hideName = 1;
      this.hideDate = 1;
    }
    if(type == 'expense'){
      this.hideAmount = 0;
      this.hideName = 1;
      this.hideDate = 1;
    }
  }

  dismiss(){
    this.modalController.dismiss();
  }

  getMaxYear(){
    let currentDate = new Date;
    return (currentDate.getFullYear() + 20).toString();   
  }

  async save(){
    if(this.type == undefined || (this.type == "card" && (this.itemName == undefined || this.datePicked == undefined)) || (this.type == "payment" && (this.itemName == undefined || this.cashAmount == undefined || this.datePicked == undefined)) || (this.type == "income" && (this.cashAmount == undefined)) || (this.type == "expense" && (this.cashAmount == undefined)) ){
      const alert = await this.alertController.create({
        header: 'Please fill in all the inputs',
        buttons: [
          {
              text: 'OK'
          }
      ]
      });
      await alert.present();
    }
    else{
      var finLog: any = {};
      if(this.type == "card"){
        finLog = {
          type: this.type,
          datePicked: this.datePicked,
          itemName: this.itemName + " Expiration"
        }
      }
      if(this.type == "payment"){
        finLog = {
            type: this.type,
            cashAmount: this.cashAmount,
            datePicked: this.datePicked,
            itemName: this.itemName
        }
      }
      if(this.type == "income" || this.type == "expense"){
        finLog = {
            type: this.type,
            cashAmount: this.cashAmount
        }
      }
      this.modalController.dismiss(finLog);
    }
    
  }

}
