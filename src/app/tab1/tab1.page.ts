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
  balance: number = 0;

  subBool: boolean;

  constructor(public navCtrl: NavController, public modalController: ModalController, private storage: Storage){
    
    this.storage.get('logsArr').then((val) => {
      if (val != "[]"){
       this.logs = JSON.parse(val)
      }
      else{
       this.storage.set('logsArr', JSON.stringify(this.logs));
      }
    });

    this.storage.get('balanceVal').then((val) => {
      if (val != ""){
       this.balance = val
      }
      else{
       this.storage.set('balanceVal', this.balance);
      }
    });
    
  }

  ionViewWillEnter(){
    this.storage.get('subPaymentsBool').then((val) => {
      if (val != undefined){
        this.subBool = val
      }
    });
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
    return (log.type == "card" || log.type == "payment");
    } 
  }

  removeCard(card) {

    let index = this.logs.indexOf(card);

        if(index > -1){
            if(this.logs[index].type == "payment" && this.subBool == true){
              this.balance = this.balance - +(this.logs[index].cashAmount);
              this.storage.set('balanceVal', this.balance);
            }

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
          if(data.data.type != "expense" && data.data.type != "income"){
            data.data.itemName = makeUpper(data.data.itemName);
          }

          if (data.data.type == "expense"){
            this.balance = this.balance - +data.data.cashAmount
            this.storage.set('balanceVal', this.balance);
          }
          if (data.data.type == "income"){
            this.balance = this.balance + +data.data.cashAmount
            this.storage.set('balanceVal', this.balance);
          }
          if (data.data.type == "card"){
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
          
          if (data.data.type == "payment"){
            if(data.data.recurMonths != undefined){
              for(let i = 0; i < +data.data.recurMonths; i++){
                var newDate = new Date(data.data.datePicked);
                newDate.setMonth(newDate.getMonth() + i)
                if (this.logs == null){
                  this.logs = [];
                  this.logs.push({
                    type: data.data.type,
                    cashAmount: data.data.cashAmount,
                    datePicked: newDate,
                    itemName: data.data.itemName
                  })
                }
                else{
                  var newData = Object.assign({},data.data);
                  newData.datePicked = newDate;
                  newData.recurMonths = undefined;
                  this.logs.push(newData);
                }
              }
              this.storage.set('logsArr', JSON.stringify(this.logs));
            }
            else{
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
          }
        }
        
        function makeUpper(newTitle) {
          return newTitle.replace(/\w\S*/g, function(newTitle2){
              return newTitle2.charAt(0).toUpperCase() + newTitle2.substr(1).toLowerCase();
          });
        }
    });

    await modal.present(); 

  }

}
