import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';
import { IgracService } from '../services/igrac/igrac.service';
import { Igrac } from '../shared/models/igrac';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PreferenceComponent } from '../preference/preference.component';
import { Preference } from '../shared/models/preference';
import { selectPreferenceUPrijavi } from '../shared/state/prijava/prijava.selector';
import { Prijava } from '../shared/models/prijava';
//import { selectPotrebanBrojSlusalica } from '../shared/state/prijava/prijava.selector';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css'],
})
export class PrijavaComponent {
  prijavljeniTurnir$: Observable<Turnir> =
    this.turnirService.vratiPrijavljeniTUrnir();
  igraciUTimu$: Observable<Igrac[]> = this.igracService.vratiIgraceIzTima();
  preference$: Observable<Preference> = this.store
    .select(selectPreferenceUPrijavi)
    .pipe(map((p: any) => p.preference));
  prijava: Prijava = {
    potrebanBrojSlusalica: 0,
    potrebanBrojRacunara: 0,
    potrebanBrojTastatura: 0,
    potrebanBrojMiseva: 0,
    igraci: [],
    turnir: null,
  };
  constructor(
    private turnirService: TurnirService,
    private igracService: IgracService,
    private router: Router,
    private store: Store
  ) {}
  posaljiPrijavu() {
    this.prijavljeniTurnir$.subscribe((turnir) => {
      this.prijava.turnir = turnir;
    });

    this.igraciUTimu$.subscribe((igraci) => {
      this.prijava.igraci = igraci;
    });

    this.preference$.subscribe((preference) => {
      this.prijava.potrebanBrojSlusalica = preference.potrebanBrojSlusalica;
      this.prijava.potrebanBrojRacunara = preference.potrebanBrojRacunara;
      this.prijava.potrebanBrojTastatura = preference.potrebanBrojTastatura;
      this.prijava.potrebanBrojMiseva = preference.potrebanBrojMiseva;
    });
    console.log(this.prijava);
  }
}
