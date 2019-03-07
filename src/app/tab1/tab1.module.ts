import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { FinanceModalPage } from '../finance-modal/finance-modal.page';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    IonicStorageModule.forRoot()
  ],
  declarations: [Tab1Page, FinanceModalPage],
  entryComponents: [FinanceModalPage]
})
export class Tab1PageModule {}
