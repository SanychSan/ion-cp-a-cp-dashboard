import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('src/app/pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'spot',
    loadChildren: () => import('src/app/pages/spot/spot.module').then(m => m.SpotPageModule)
  },
  {
    path: 'credentials',
    loadComponent: () =>
      import('src/app/pages/credentials/credentials.page').then(m => m.CredentialsPage)
  },
  {
    path: 'coin/:id',
    loadComponent: () => import('src/app/pages/coin/coin.page').then(m => m.CoinPage)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
