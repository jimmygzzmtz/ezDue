import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  recurBool: boolean;
  recurringPayments: any;

  subBool: boolean;
  subPayBal: any;

  delBool: boolean;
  deleteButton: any;

  balBool: boolean;
  balanceHistory: any;

  notifBool: boolean;
  showNotif: any;
  
  constructor(private storage: Storage, private _translate: TranslateService){
    
    this.storage.get('recurringPaymentsBool').then((val) => {
      if (val != null){
       this.recurBool = val;
      }
      else{
       this.storage.set('recurringPaymentsBool', false);
      }

      
      if(this.recurBool == true){
        this.recurringPayments = true;
      }
      if(this.recurBool == false){
        this.recurringPayments = false;
      }
      

    });

    this.storage.get('subPaymentsBool').then((val) => {
      if (val != null){
       this.subPayBal = val;
      }
      else{
       this.storage.set('subPaymentsBool', false);
      }

      
      if(this.subBool == true){
        this.subPayBal = true;
      }
      if(this.subBool == false){
        this.subPayBal = false;
      }
      

    });

    this.storage.get('deleteBt').then((val) => {
      if (val != null){
       this.deleteButton = val;
      }
      else{
       this.storage.set('deleteBt', true);
      }

      
      if(this.delBool == false){
        this.deleteButton = false;
      }
      if(this.delBool == true){
        this.deleteButton = true;
      }
      

    });

    this.storage.get('balanceBt').then((val) => {
      if (val != null){
       this.balanceHistory = val;
      }
      else{
       this.storage.set('balanceBt', true);
       this.balBool = true;
      }

      
      if(this.balBool == false){
        this.balanceHistory = false;
      }
      if(this.balBool == true){
        this.balanceHistory = true;
      }
      

    });

    this.storage.get('notifBt').then((val) => {
      if (val != null){
       this.showNotif = val;
      }
      else{
       this.storage.set('notifBt', false);
       this.notifBool = false;
      }

      
      if(this.notifBool == false){
        this.showNotif = false;
      }
      if(this.notifBool == true){
        this.showNotif = true;
      }
      

    });

  }

  switchRecur(){
    if(this.recurringPayments == true){
      this.recurBool = true;
    }
    if(this.recurringPayments == false){
      this.recurBool = false;
    }

    this.storage.set('recurringPaymentsBool', this.recurBool);
  }

  switchSub(){
    if(this.subPayBal == true){
      this.subBool = true;
    }
    if(this.subPayBal == false){
      this.subBool = false;
    }

    this.storage.set('subPaymentsBool', this.subBool);
  }

  switchDel(){
    if(this.deleteButton == false){
      this.delBool = false;
    }
    if(this.deleteButton == true){
      this.delBool = true;
    }

    this.storage.set('deleteBt', this.delBool);
  }

  switchBalance(){
    if(this.balanceHistory == false){
      this.balBool = false;
    }
    if(this.balanceHistory == true){
      this.balBool = true;
    }

    this.storage.set('balanceBt', this.balBool);
  }

  switchNotif(){
    if(this.showNotif == false){
      this.notifBool = false;
    }
    if(this.showNotif == true){
      this.notifBool = true;
    }

    this.storage.set('notifBt', this.notifBool);
  }

  switchLang(lang){
    this._translate.use(lang);
    this.storage.set('lang', lang);
  }

  

  getToggleCond(){
    return this.recurBool;
  }
}
