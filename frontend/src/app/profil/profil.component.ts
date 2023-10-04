import { Component, Input } from '@angular/core';
import { Igrac } from '../shared/models/igrac';
import { IgracService } from '../services/igrac/igrac.service';
import { Observable, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Organizator } from '../shared/models/organizator';
import { selectPrijavljeniKorisnik } from '../shared/state/korisnik/korisnik.selector';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  korisnickoIme: string = '';
  ime: string = '';
  prezime: string = '';

  //trenutnoPrijavljeniIgrac$: Observable<Igrac> = new Observable();
  // trenutnoPrijavljeniIgrac$: Observable<Igrac | null> = new Observable();
  // trenutnoPrijavljeniOrganizator$: Observable<Organizator | null> =
  trenutnoPrijavljeniKorisnik$: Observable<Igrac | Organizator | undefined> =
    this.storeService.pribaviTrenutnoPrijavljenogKorisnika().pipe(
      tap((x) => {
        this.korisnickoIme = x?.korisnickoIme ? x!.korisnickoIme : '';
        this.ime = x?.ime ? x!.ime : '';
        this.prezime = x?.prezime ? x!.prezime : '';
      })
    );
  uredjivanjeOmoguceno: boolean = false;
  daLiJeLozinkaUnesena: boolean = false;
  unesenaLozinka: string = '';
  IzmenjeniKorisnik!: Igrac | Organizator;

  constructor(
    private igracService: IgracService,
    private store: Store,
    private storeService: StoreService
  ) {}
  omoguciUredjivanje() {
    this.uredjivanjeOmoguceno = true;
  }
  unosLozinke() {
    this.daLiJeLozinkaUnesena = true;
  }
  promeniPodatke() {
    console.log(this.korisnickoIme);
    const izmenjeniIgrac: any = {
      korisnickoIme: this.korisnickoIme,
      ime: this.ime,
      prezime: this.prezime,
    };
    this.igracService.izmeniPodatkeOIgracu(izmenjeniIgrac).subscribe(() => {});

    // this.trenutnoPrijavljeniKorisnik$.subscribe((korisnik) => {
    //   if (korisnik?.role == 'igrac') {
    //     const izmenjeniIgrac: any = { ...korisnik };
    //     izmenjeniIgrac.korisnickoIme = this.korisnickoIme;
    //     console.log(this.korisnickoIme);
    //     this.igracService
    //       .izmeniPodatkeOIgracu(izmenjeniIgrac)
    //       .subscribe(() => {});
    //   }
    // });
  }
}
