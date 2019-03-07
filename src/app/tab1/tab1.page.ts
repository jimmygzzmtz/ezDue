import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FinanceModalPage } from '../finance-modal/finance-modal.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  logs: any = [];
  total: number = 0;

  constructor(public navCtrl: NavController, public modalController: ModalController, private storage: Storage){
    
    this.storage.get('logsArr').then((val) => {
      if (val != "[]"){
       this.logs = JSON.parse(val)
      }
      else{
       this.storage.set('logsArr', JSON.stringify(this.logs));
      }
    });
    
  }

  totalBalance(){
    this.total = 0;

    if (this.logs != undefined){
      for(let i = 0; i<this.logs.length; i++){
        if(this.logs[i].type == "income"){
          this.total = this.total + +this.logs[i].cashAmount;    
        }
        if(this.logs[i].type == "expense"){
          this.total = this.total - +this.logs[i].cashAmount;    
        }
      }
    }
    
    return this.total;

  }

  getCards() {
   var logs2 = this.logs.filter(checkCard, this);
   logs2.sort((a: any, b: any) => {
      var aDate = new Date(a.datePicked.valueOf());
      var bDate = new Date(b.datePicked.valueOf());
      return aDate.getTime() - bDate.getTime();
    }); 
    return logs2;

   function checkCard(log) {
    return (log.type == "card" || log.type == "payment");
    } 
  }

  removeCard(card) {

    let index = this.logs.indexOf(card);

        if(index > -1){
            this.logs.splice(index, 1);
            this.storage.set('logsArr', JSON.stringify(this.logs));
        }

  }

  hideAmount(card){
    return (card.cashAmount == undefined);
  }

  async logFinance() {
    const modal = await this.modalController.create({
      component: FinanceModalPage,
      componentProps: { 
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data != undefined){
          if (this.logs == null){
            this.logs = [];
            this.logs.push({
              type: data.data.type,
              cashAmount: data.data.cashAmount,
              datePicked: data.data.datePicked,
              itemName: data.data.itemName
            })
          }
          else{
            this.logs.push(data.data);
          }
          this.storage.set('logsArr', JSON.stringify(this.logs));
        }     
    });

    await modal.present(); 

  }

}
