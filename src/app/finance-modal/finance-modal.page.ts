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
  datePicked2: any;
  itemName: any;
  
  hideAmount: any;
  hideName: any;
  hideDate: any;
  hideDate2: any;
  hideRecur: any = 1;
  hideCurr: any = 1;

  recurBool: boolean;
  recurMonths: any;
  balHistBool: boolean;

  editedLog: any;

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

  ionViewWillEnter(){
    if(this.editedLog != undefined){
      this.type = this.editedLog.type
      this.cashAmount = this.editedLog.cashAmount
      this.datePicked = this.editedLog.datePicked
      this.datePicked2 = this.editedLog.datePicked2
      this.itemName = this.editedLog.itemName
      this.recurMonths = this.editedLog.recurMonths
    }
  }

  ngOnInit() {
  }

  onChange(type){
    if(type == 'card'){
      this.hideAmount = 1;
      this.hideName = 0;
      this.hideDate = 0;
      this.hideDate2 = 1;
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
      this.hideDate2 = 1;
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
      this.hideDate2 = 1;
      this.hideRecur = 1;
      this.hideCurr = 0;
    }
    if(type == 'creditcard'){
      this.hideAmount = 0;
      this.hideName = 0;
      this.hideDate = 0;
      this.hideDate2 = 0;
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

    var cash2;

    if(this.cashAmount != undefined){
      cash2 = this.cashAmount.replace(/\,/g,"");
    }

    if(this.type == undefined){
      return true;
    }


    if(this.type == "card" && (this.itemName == undefined || this.itemName == "" || this.datePicked == undefined)){
      return true;
    }

    if((this.type == "payment") && (this.itemName == undefined || this.itemName == "" || cash2 == undefined || cash2 == "" || isNaN(cash2) || this.datePicked == undefined)){
      return true;
    }

    if((this.type == "creditcard") && (this.itemName == undefined || this.itemName == "" || cash2 == undefined || cash2 == "" || isNaN(cash2) || this.datePicked == undefined || this.datePicked2 == undefined)){
      return true;
    }

    if((this.type == "income" || this.type == "expense") && (this.balHistBool == false) && (cash2 == undefined || cash2 == "" || isNaN(cash2))){
      return true;
    }

    if((this.type == "income" || this.type == "expense") && (this.balHistBool == true) && (this.itemName == undefined || this.itemName == "" || cash2 == undefined || cash2 == "" || isNaN(cash2))){
      return true;
    }

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
          itemName: this.itemName
        }
      }
      if(this.type == "payment"){
        finLog = {
            type: this.type,
            cashAmount: this.cashAmount.replace(/\,/g,""),
            datePicked: this.datePicked,
            itemName: this.itemName,
            recurMonths: this.recurMonths
        }
      }
      if(this.type == "creditcard"){
        finLog = {
            type: this.type,
            cashAmount: this.cashAmount.replace(/\,/g,""),
            datePicked: this.datePicked,
            datePicked2: this.datePicked2,
            itemName: this.itemName
        }
      }
      if(this.type == "income" || this.type == "expense"){

        let currentDate = new Date;
        
        if(this.balHistBool == true){
          finLog = {
            type: this.type,
            cashAmount: this.cashAmount.replace(/\,/g,""),
            itemName: this.itemName,
            datePicked: currentDate
          }
        }
        
        else{
          finLog = {
            type: this.type,
            cashAmount: this.cashAmount.replace(/\,/g,""),
            datePicked: currentDate
          } 
        } 

      }
      this.modalController.dismiss(finLog);
    }
    
  }

}
