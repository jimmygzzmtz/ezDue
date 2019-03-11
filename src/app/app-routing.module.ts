import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'finance-modal', loadChildren: './finance-modal/finance-modal.module#FinanceModalPageModule' },
  { path: 'productivity-modal', loadChildren: './productivity-modal/productivity-modal.module#ProductivityModalPageModule' },
  { path: 'balance-modal', loadChildren: './balance-modal/balance-modal.module#BalanceModalPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
