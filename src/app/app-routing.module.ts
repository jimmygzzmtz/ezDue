import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'finance-modal', loadChildren: () => import('./finance-modal/finance-modal.module').then(m => m.FinanceModalPageModule) },
  { path: 'productivity-modal', loadChildren: () => import('./productivity-modal/productivity-modal.module').then(m => m.ProductivityModalPageModule) },
  { path: 'balance-modal', loadChildren: () => import('./balance-modal/balance-modal.module').then(m => m.BalanceModalPageModule) }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
