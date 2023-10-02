import { Component, Input } from '@angular/core';
import { Turnir } from '../shared/models/turnir';
// /import { KorpaService } from '../services/korpa/korpa.service';
import { TurnirService } from '../services/turnir/turnir.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as TurnirActions from 'src/app/shared/state/turnir/turnir.actions';
import * as PrijavaActions from 'src/app/shared/state/prijava/prijava.actions';
import { Observable, map } from 'rxjs';
import { Igrac } from '../shared/models/igrac';
import { Organizator } from '../shared/models/organizator';
import { selectPrijavljeniKorisnik } from '../shared/state/korisnik/korisnik.selector';
import { IgracService } from '../services/igrac/igrac.service';
import { PrijavaService } from '../services/prijava.service';
@Component({
  selector: 'app-turnir',
  templateUrl: './turnir.component.html',
  styleUrls: ['./turnir.component.css'],
})
export class TurnirComponent {
  @Input()
  turnir!: Turnir;
  trenutnoPrijavljeniKorisnik$: Observable<Igrac | Organizator | undefined> =
    new Observable();
  constructor(
    //private korpaService: KorpaService,
    private turnirService: TurnirService,
    private igracService: IgracService,
    private prijavaService: PrijavaService,
    private store: Store,
    private router: Router
  ) {
    this.trenutnoPrijavljeniKorisnik$ = this.store
      .select(selectPrijavljeniKorisnik)
      .pipe(map((p: any) => p?.prijavljeniKorisnik));
  }
  //todo vodja tima moze iz tima da izbaci saigrace,samo ako je to njegov tim
  //todo on ce moci i  da vidi saigrace samo ako je njegov tim tkd ez
  //todo autentif za vodju
  prijaviSeNaTurnir(turnir: Turnir, korisnik: Igrac | Organizator) {
    const igrac: Igrac = korisnik as Igrac;
    this.store.dispatch(PrijavaActions.prijaviSeNaTurnir({ turnir }));
    this.store.dispatch(PrijavaActions.dodajIgracaUTim({ igrac }));
    this.router.navigateByUrl('sviIgraci');
  }
  odjaviSvojTimSaTurnira(turnirId: number, igracId: number) {
    this.prijavaService
      .odjaviSvojTimSaTurnira(turnirId, igracId)
      .subscribe(() => alert('uspesno ste odjavili turnir'));
  }
  async prikaziPrijavljeneTimove(turnirId: number) {
    this.router.navigateByUrl(`prijavljeniTimovi/${turnirId}`);
  }

  async vidiSaigrace(turnirId: number, igracId: number) {
    this.router.navigateByUrl(`mojiSaigraci/${turnirId}/${igracId}`);
    //this.igracService.vidiSaigrace(turnirId, igracId);
  }
  jeVodjaTima(user: any): user is Igrac {
    return user.role === 'igrac' && user.vodjaTima === true;
  }
}
