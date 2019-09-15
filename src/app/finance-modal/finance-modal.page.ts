import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

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
  hideRecur: any = 1;
  hideCurr: any = 1;

  recurBool: boolean;

  recurMonths: any;

  balHistBool: boolean;

  constructor(public modalController: ModalController, public alertController: AlertController, private storage: Storage, private _translate: TranslateService ) {
    
    this.storage.get('recurringPaymentsBool').then((val) => {
      if (val != null){
       this.recurBool = val;
      }
    });

    this.storage.get('balanceBt').then((val) => {
      if (val != null){
       this.balHistBool = val;
      }
    });
   
  }

  ngOnInit() {

  }

  onChange(type){
    if(type == 'card'){
      this.hideAmount = 1;
      this.hideName = 0;
      this.hideDate = 0;
      this.hideRecur = 1;
      this.hideCurr = 1;
    }
    if(type == 'payment'){
      if(this.recurBool == true){
        this.hideRecur = 0;
      }
      if(this.recurBool == false){
        this.hideRecur = 1;
      }
      this.hideAmount = 0;
      this.hideName = 0;
      this.hideDate = 0;
      this.hideCurr = 0;
    }
    if(type == 'income' || type == 'expense'){
      if(this.balHistBool == true){
        this.hideName = 0;
      }
      if(this.balHistBool == false){
        this.hideName = 1;
      }
      this.hideAmount = 0;
      this.hideDate = 1;
      this.hideRecur = 1;
      this.hideCurr = 0;
    }
  }

  dismiss(){
    this.modalController.dismiss();
  }

  getMaxYear(){
    let currentDate = new Date;
    return (currentDate.getFullYear() + 20).toString();   
  }

  checkEmpty(){

    if(this.type == undefined){
      return true;
    }

    if(this.type == "card" && (this.itemName == undefined || this.itemName == "" || this.datePicked == undefined)){
      return true;
    }

    if(this.type == "payment" && (this.itemName == undefined || this.itemName == "" || this.cashAmount == undefined || this.cashAmount == "" || isNaN(this.cashAmount) || this.datePicked == undefined)){
      return true;
    }

    if((this.type == "income" || this.type == "expense") && (this.balHistBool == false) && (this.cashAmount == undefined || this.cashAmount == "" || isNaN(this.cashAmount))){
      return true;
    }

    if((this.type == "income" || this.type == "expense") && (this.balHistBool == true) && (this.itemName == undefined || this.itemName == "" || this.cashAmount == undefined || this.cashAmount == "" || isNaN(this.cashAmount))){
      return true;
    }
    
    //checar si cashamount no es numero

  }

  async save(){
    if(this.checkEmpty()){
      const alert = await this.alertController.create({
        header: this._translate.instant('FillInput'),
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
            itemName: this.itemName,
            recurMonths: this.recurMonths
        }
      }
      if(this.type == "income" || this.type == "expense"){

        let currentDate = new Date;
        
        if(this.balHistBool == true){
          finLog = {
            type: this.type,
            cashAmount: this.cashAmount,
            itemName: this.itemName,
            datePicked: currentDate
          }
        }
        
        else{
          finLog = {
            type: this.type,
            cashAmount: this.cashAmount,
            datePicked: currentDate
          } 
        } 

      }
      this.modalController.dismiss(finLog);
    }
    
  }

}
