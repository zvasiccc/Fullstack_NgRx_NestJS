import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KreiranjeTurniraComponent } from './kreiranje-turnira/kreiranje-turnira.component';
//import { KorpaComponent } from './korpa/korpa.component';
import { ProfilComponent } from './profil/profil.component';
import { IgraciNaTurniruComponent } from './igraci-na-turniru/igraci-na-turniru.component';
import { LoginComponent } from './login/login.component';
import { SviIgraciComponent } from './svi-igraci/svi-igraci.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PreferenceComponent } from './preference/preference.component';
import { TimoviNaTurniruComponent } from './timovi-na-turniru/timovi-na-turniru.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'kreiranjeTurnira',
    component: KreiranjeTurniraComponent,
  },
  // {
  //   path: 'korpa',
  //   component: KorpaComponent,
  // },
  {
    path: 'profil',
    component: ProfilComponent,
  },
  {
    path: 'prijavljeniIgraci/:turnirId', // Parametar :turnirId
    component: IgraciNaTurniruComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sviIgraci',
    component: SviIgraciComponent,
  },
  {
    path: 'prijava',
    component: PrijavaComponent,
  },
  {
    path: 'preference',
    component: PreferenceComponent,
  },
  {
    path: 'prijavljeniTimovi/:turnirId',
    component: TimoviNaTurniruComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
