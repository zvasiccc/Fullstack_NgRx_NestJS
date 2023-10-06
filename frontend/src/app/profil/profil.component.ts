import { Component, Input } from '@angular/core';
import { Igrac } from '../shared/models/igrac';
import { IgracService } from '../services/igrac/igrac.service';
import { Observable, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Organizator } from '../shared/models/organizator';
import { selectPrijavljeniKorisnik } from '../shared/state/korisnik/korisnik.selector';
import { StoreService } from '../services/store.service';
import { OrganizatorService } from '../services/organizator.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  korisnickoIme: string = '';
  ime: string = '';
  prezime: string = '';
  role: string = '';

  trenutnoPrijavljeniKorisnik$: Observable<Igrac | Organizator | undefined> =
    this.storeService.pribaviTrenutnoPrijavljenogKorisnika().pipe(
      tap((x) => {
        this.korisnickoIme = x?.korisnickoIme ? x!.korisnickoIme : '';
        this.ime = x?.ime ? x!.ime : '';
        this.prezime = x?.prezime ? x!.prezime : '';
        this.role = x?.role ? x!.role : '';
      })
    );
  uredjivanjeOmoguceno: boolean = false;
  unesenaLozinka: string = '';
  IzmenjeniKorisnik!: Igrac | Organizator;

  constructor(
    private igracService: IgracService,
    private organizatorService: OrganizatorService,

    private storeService: StoreService,
    private _snackBar: MatSnackBar
  ) {}
  omoguciUredjivanje() {
    this.uredjivanjeOmoguceno = true;
  }
  promeniPodatke() {
    const izmenjeniKorisnik: any = {
      korisnickoIme: this.korisnickoIme,
      ime: this.ime,
      prezime: this.prezime,
    };
    if (this.role == 'igrac')
      this.igracService
        .izmeniPodatkeOIgracu(izmenjeniKorisnik)
        .subscribe(() => {});
    if (this.role == 'organizator')
      this.organizatorService
        .izmeniPodatkeOOrganizatoru(izmenjeniKorisnik)
        .subscribe(() => {});
    this._snackBar.open('Uspesno ste promenili svoje podatke', 'Zatvori', {
      duration: 2000,
    });
  }
}
