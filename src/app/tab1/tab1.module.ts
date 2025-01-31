import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { FinanceModalPage } from '../finance-modal/finance-modal.page';
import { BalanceModalPage } from '../balance-modal/balance-modal.page';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    IonicStorageModule.forRoot()
  ],
  declarations: [Tab1Page, FinanceModalPage, BalanceModalPage],
  entryComponents: [FinanceModalPage, BalanceModalPage]
})
export class Tab1PageModule {}
