import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private _translate: TranslateService, private storage: Storage){

    this.storage.get('lang').then((val) => {
      if (val != null){
        this._translate.use(val);
      }
      else{
        this._translate.use(this._translate.getBrowserLang());
       this.storage.set('lang', this._translate.getBrowserLang());
      }

    });

  }
}
