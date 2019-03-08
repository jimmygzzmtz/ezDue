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

  getToggleCond(){
    return this.recurBool;
  }
}
