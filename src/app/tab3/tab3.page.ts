import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';

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

  lang: any;

  darkOpt: any;
  
  constructor(private storage: Storage, private _translate: TranslateService, public alertController: AlertController){
    
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
       this.delBool = true;
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

    this.storage.get('darkMode').then((val) => {
      if (val != null){
        this.darkOpt.value = val
      }
      else{
       this.storage.set('darkMode', 'system');
       this.darkOpt.value = 'system'
      }

    });

  }

  ngOnInit() {
    this.darkOpt = document.querySelector('#darkOpt');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addListener((e) => this.checkToggle(e.matches));
    this.checkToggle(prefersDark.matches)
  }

  checkToggle(shouldCheck) {
    if(this.darkOpt.value == 'system'){
      if(shouldCheck == true){
        document.body.classList.add('dark')
      }
      if(shouldCheck == false){
        document.body.classList.remove('dark')
      }
    }
    
  }

  selectDarkTheme(){
    if(this.darkOpt.value == 'system'){
      document.body.classList.toggle('dark', (window.matchMedia('(prefers-color-scheme: dark)').matches))
      this.storage.set('darkMode', this.darkOpt.value);
    }
    if(this.darkOpt.value == 'on'){
      document.body.classList.add('dark')
      this.storage.set('darkMode', this.darkOpt.value);
    }
    if(this.darkOpt.value == 'off'){
      document.body.classList.remove('dark')
      this.storage.set('darkMode', this.darkOpt.value);
    }
  }

  ionViewWillEnter(){
    this.storage.get('lang').then((val) => {
      this.lang = val
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

  async clearStorage() {
    const alert = await this.alertController.create({
      header: this._translate.instant('ClearSt'),
      message: this._translate.instant('ConfirmClear'),
      buttons: [
        {
            text: this._translate.instant('Cancel')
        },
        {
            text: 'OK',
            handler: data => {
              this.storage.clear()
              location.reload()
            }
        }
    ]
    });

    await alert.present();
  }
}
