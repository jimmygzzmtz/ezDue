import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FinanceModalPage } from './finance-modal.page';

import { IonicStorageModule } from '@ionic/storage';

const routes: Routes = [
  {
    path: '',
    component: FinanceModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicStorageModule.forRoot()
  ],
  declarations: [FinanceModalPage]
})
export class FinanceModalPageModule {}
