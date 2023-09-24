import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TurnirComponent } from './turnir/turnir.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { KreiranjeTurniraComponent } from './kreiranje-turnira/kreiranje-turnira.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {
  // turnirReducer,
  turnirReducerBaza,
} from './shared/state/turnir/turnir.reducer';
import { CommonModule } from '@angular/common';
//import { KorpaComponent } from './korpa/korpa.component';
//import { korpaReducer } from './shared/state/korpa/korpa.reducer';
import { IgracComponent } from './igrac/igrac.component';
import { ProfilComponent } from './profil/profil.component';
import { igracReducer } from './shared/state/igrac/igrac.reducer';
import { IgraciNaTurniruComponent } from './igraci-na-turniru/igraci-na-turniru.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { HttpClientModule } from '@angular/common/http';
import { OdgovarajuciTurniriComponent } from './odgovarajuci-turniri/odgovarajuci-turniri.component';
import { SviIgraciComponent } from './svi-igraci/svi-igraci.component';
import { prijavaReducer } from './shared/state/prijava/prijava.reducer';
import { PrijavaComponent } from './prijava/prijava.component';
import { PreferenceComponent } from './preference/preference.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackArrowComponent } from './back-arrow/back-arrow.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    TurnirComponent,
    HomeComponent,
    HeaderComponent,
    TurnirComponent,
    KreiranjeTurniraComponent,
    // KorpaComponent,
    IgracComponent,
    ProfilComponent,
    IgraciNaTurniruComponent,
    LoginComponent,
    RegistracijaComponent,
    OdgovarajuciTurniriComponent,
    SviIgraciComponent,
    PrijavaComponent,
    PreferenceComponent,
    BackArrowComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule,

    StoreModule.forRoot({}),
    // StoreModule.forFeature('turniri', turnirReducer),
    StoreModule.forFeature('prijavljeniTurniri', turnirReducerBaza),
    //StoreModule.forFeature('turniriKorpa', korpaReducer),
    StoreModule.forFeature('igraci', igracReducer),
    StoreModule.forFeature('turnirUPrijavi', prijavaReducer),
    StoreModule.forFeature('igraciUPrijavi', prijavaReducer),
    StoreModule.forFeature('preferenceUPrijavi', prijavaReducer),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
