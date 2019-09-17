import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FinanceModalPage } from '../finance-modal/finance-modal.page';
import { Storage } from '@ionic/storage';
import { BalanceModalPage } from '../balance-modal/balance-modal.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { TranslateService } from '@ngx-translate/core';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  logs: any = [];
  balance: number = 0;

  subBool: boolean;
  delBool: boolean = false;
  balBool: boolean;
  notifBool: boolean;

  public language: string;

  constructor(public navCtrl: NavController, public modalController: ModalController, private storage: Storage, private localNotifications: LocalNotifications, private admobFree: AdMobFree, private _translate: TranslateService){

    const bannerConfig: AdMobFreeBannerConfig = {
      isTesting: false,
      autoShow: true,
      id: "ca-app-pub-5122351026058644/2830952715"
     };
     this.admobFree.banner.config(bannerConfig);
     
     
     this.admobFree.banner.prepare()
       .then(() => {

       })
       .catch(e => console.log(e));
      
    


    this.storage.get('logsArr').then((val) => {
      if (val != "[]"){
       this.logs = JSON.parse(val)
      }
      else{
       this.storage.set('logsArr', JSON.stringify(this.logs));
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

    this.storage.get('deleteBt').then((val) => {
      if (val != undefined){
       this.delBool = !val
      }
      else{
       this.storage.set('deleteBt', true);
      }
    });

    this.storage.get('balanceBt').then((val) => {
      if (val != undefined){
       this.balBool = !val
      }
      else{
       this.storage.set('balanceBt', true);
      }
    });

    this.storage.get('notifBt').then((val) => {
      if (val != undefined){
       this.balBool = val
      }
      else{
       this.storage.set('notifBt', false);
      }
    });
    
  }

  ionViewWillEnter(){
    this.language = "" + this._translate.currentLang
    
    if(this.language == "undefined"){
      this.language = this._translate.getBrowserLang()
    }

    this.storage.get('subPaymentsBool').then((val) => {
      if (val != undefined){
        this.subBool = val
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

    this.storage.get('balanceBt').then((val) => {
      if (val != undefined){
       this.balBool = !val
      }
      else{
       this.storage.set('balanceBt', true);
      }
    });

    this.storage.get('notifBt').then((val) => {
      if (val != undefined){
       this.notifBool = val
      }
      else{
       this.storage.set('notifBt', false);
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
            var cardCopy = this.logs[index].valueOf()

            if(this.logs[index].type == "payment" && this.subBool == true){
              this.balance = this.balance - +(this.logs[index].cashAmount);
              this.storage.set('balanceVal', this.balance);

            }

            this.logs.splice(index, 1);

            if(this.balBool == false && cardCopy.type == "payment" && this.subBool == true){
              this.logs.push({
                type: "expense",
                cashAmount: +(cardCopy.cashAmount),
                itemName: card.itemName,
                datePicked: card.datePicked
              })
              
            }
            this.storage.set('logsArr', JSON.stringify(this.logs));
        }

  }

  async editCard(card) {

    let index = this.logs.indexOf(card);

    const modal = await this.modalController.create({
      component: FinanceModalPage,
      componentProps: { 
        editedLog: card
      }
    });

    modal.onDidDismiss()
      .then((data) => {
          if (data.data != undefined){
            this.logs[index] = data.data
            this.storage.set('logsArr', JSON.stringify(this.logs));
          }
    });

    await modal.present(); 

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

            if(this.notifBool == true){
              
              var d1 = new Date(data.data.datePicked);

              d1.setHours(d1.getHours() - 1);

              var d2 = new Date(data.data.datePicked);

              d2.setDate(d2.getDate() - 1);

              if(d1 > new Date()){
                
                this.localNotifications.schedule({
                  text: data.data.itemName,
                  trigger: {at: d1}
                });
                


              }

              if(d2 > new Date()){
                
                this.localNotifications.schedule({
                  text: data.data.itemName,
                  trigger: {at: d2}
                });

              }

            }

            
            
          }

          if (data.data.type == "expense" || data.data.type == "income"){
            
            if(data.data.type == "expense"){
              this.balance = this.balance - +data.data.cashAmount
            }
            if(data.data.type == "income"){
              this.balance = this.balance + +data.data.cashAmount
            }
            
            this.storage.set('balanceVal', this.balance);

            if(data.data.itemName != "" && data.data.itemName != undefined){
              data.data.itemName = makeUpper(data.data.itemName);

              if (this.logs == null){
                this.logs = [];
                this.logs.push({
                  type: data.data.type,
                  cashAmount: data.data.cashAmount,
                  itemName: data.data.itemName,
                  datePicked: data.data.datePicked
                })
              }
              else{
                this.logs.push(data.data);
              }
              this.storage.set('logsArr', JSON.stringify(this.logs));

            }
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

  async openBalance() {
    const modal = await this.modalController.create({
      component: BalanceModalPage,
      componentProps: { 
      }
    });

    modal.onDidDismiss()
      .then(() => {
        
        this.storage.get('balanceVal').then((val) => {
          if (val != undefined){
           this.balance = val
          }
          else{
           this.storage.set('balanceVal', this.balance);
          }
        });

        this.storage.get('logsArr').then((val) => {
          if (val != undefined){
           this.logs = JSON.parse(val)
          }
          else{
           this.storage.set('logsArr', JSON.stringify(this.logs));
          }
        });
        
    });

    await modal.present(); 

  }

}
