import { Component, Input } from '@angular/core';
import { Igrac } from '../shared/models/igrac';
import { IgracService } from '../services/igrac/igrac.service';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Organizator } from '../shared/models/organizator';
import { selectPrijavljeniKorisnik } from '../shared/state/korisnik/korisnik.selector';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  //trenutnoPrijavljeniIgrac$: Observable<Igrac> = new Observable();
  // trenutnoPrijavljeniIgrac$: Observable<Igrac | null> = new Observable();
  // trenutnoPrijavljeniOrganizator$: Observable<Organizator | null> =
  trenutnoPrijavljeniKorisnik$: Observable<Igrac | Organizator | undefined> =
    new Observable();
  uredjivanjeOmoguceno: boolean = false;
  daLiJeLozinkaUnesena: boolean = false;
  unesenaLozinka: string = '';
  IzmenjeniKorisnik!: Igrac | Organizator;

  constructor(private igracService: IgracService, private store: Store) {
    this.trenutnoPrijavljeniKorisnik$ = this.store
      .select(selectPrijavljeniKorisnik)
      .pipe(map((p: any) => p?.prijavljeniKorisnik));
  }
  omoguciUredjivanje() {
    this.uredjivanjeOmoguceno = true;
  }
  unosLozinke() {
    this.daLiJeLozinkaUnesena = true;
  }
  promeniPodatke() {
    this.trenutnoPrijavljeniKorisnik$.subscribe((korisnik) => {
      if (korisnik?.role == 'igrac') {
        const izmenjeniIgrac: any = { ...korisnik };
        izmenjeniIgrac.korisnickoIme = this.igracService
          .izmeniPodatkeOIgracu(izmenjeniIgrac)
          .subscribe(() => {});
      }
    });
  }
}
