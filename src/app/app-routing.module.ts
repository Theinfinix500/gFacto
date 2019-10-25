import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeFactureComponent } from './pages/liste-facture/liste-facture.component';
import { AjoutFactureComponent } from './pages/ajout-facture/ajout-facture.component';


const routes: Routes = [
  {
    path: 'liste-facture',
    component: ListeFactureComponent
  },
  {
    path: 'ajout-facture',
    component: AjoutFactureComponent
  },
  {
    path: '',
    redirectTo: '/liste-facture',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
