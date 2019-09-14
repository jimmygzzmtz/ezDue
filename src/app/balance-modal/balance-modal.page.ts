import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-balance-modal',
  templateUrl: './balance-modal.page.html',
  styleUrls: ['./balance-modal.page.scss'],
})
export class BalanceModalPage implements OnInit {

  logs: any = [];

  delBool: boolean = false;

  balance: number = 0;

  constructor(public modalController: ModalController, private storage: Storage) {

    this.storage.get('logsArr').then((val) => {
      if (val != "[]"){
       this.logs = JSON.parse(val)
      }
      else{
       this.storage.set('logsArr', JSON.stringify(this.logs));
      }
    });

    this.storage.get('deleteBt').then((val) => {
      if (val != undefined){
       this.delBool = !val
      }
      else{
       this.storage.set('deleteBt', true);
      }
    });

    this.storage.get('balanceVal').then((val) => {
      if (val != undefined){
       this.balance = val
      }
      else{
       this.storage.set('balanceVal', this.balance);
      }
    });

   }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }

  getCards() {
    if (this.logs != undefined){
 
     var logs2 = this.logs.filter(checkCard, this);
     logs2.sort((a: any, b: any) => {
        var aDate = new Date(a.datePicked.valueOf());
        var bDate = new Date(b.datePicked.valueOf());
        return aDate.getTime() - bDate.getTime();
      }); 
      return logs2;
 
    } 
 
    function checkCard(log) {
     return (log.type == "income" || log.type == "expense");
     } 
   }

   removeCard(card) {

    let index = this.logs.indexOf(card);

        if(index > -1){
            if(this.logs[index].type == "income"){
              this.balance = this.balance - +(this.logs[index].cashAmount);
              this.storage.set('balanceVal', this.balance);
            }

            if(this.logs[index].type == "expense"){
              this.balance = this.balance + +(this.logs[index].cashAmount);
              this.storage.set('balanceVal', this.balance);
            }

            this.logs.splice(index, 1);
            this.storage.set('logsArr', JSON.stringify(this.logs));
        }

  }

}
