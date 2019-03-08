import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

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
  
  constructor(private storage: Storage){
    
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
       this.storage.set('deleteBt', false);
      }

      
      if(this.delBool == false){
        this.deleteButton = false;
      }
      if(this.delBool == true){
        this.deleteButton = true;
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

  getToggleCond(){
    return this.recurBool;
  }
}
