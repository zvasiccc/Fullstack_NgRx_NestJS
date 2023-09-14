import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KreiranjeTurniraComponent } from './kreiranje-turnira/kreiranje-turnira.component';
import { KorpaComponent } from './korpa/korpa.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'kreiranjeTurnira',
    component: KreiranjeTurniraComponent,
  },
  {
    path: 'korpa',
    component: KorpaComponent,
  },
  {
    path: 'profil',
    component: ProfilComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
