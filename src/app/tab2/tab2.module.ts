import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ProductivityModalPage } from '../productivity-modal/productivity-modal.page';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    IonicStorageModule.forRoot()
  ],
  declarations: [Tab2Page, ProductivityModalPage],
  entryComponents: [ProductivityModalPage]
})
export class Tab2PageModule {}
