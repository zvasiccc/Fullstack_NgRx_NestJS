import { Component } from '@angular/core';
import { IgracService } from '../services/igrac/igrac.service';
import { Observable, map } from 'rxjs';
import { Igrac } from '../shared/models/igrac';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';
import { Store } from '@ngrx/store';
import { selectPrijavljeniTurniri } from '../shared/state/turnir/turnir.selector';

@Component({
  selector: 'app-svi-igraci',
  templateUrl: './svi-igraci.component.html',
  styleUrls: ['./svi-igraci.component.css'],
})
export class SviIgraciComponent {
  constructor(
    private igracService: IgracService,
    private store: Store,
    private turnirService: TurnirService
  ) {}
  sviIgraci$: Observable<Igrac[]> = this.igracService.vratiSveIgrace();
  pretragaIgraci$: Observable<Igrac[]> = new Observable<Igrac[]>();
  uneseniIgrac: string = '';

  ngOnInit() {}
  dodajIgracaUtim(igrac: Igrac) {
    this.igracService.dodajIgracaUTim(igrac);
  }
  pretraziIgrace(uneseniIgrac: string) {
    this.pretragaIgraci$ =
      this.igracService.vratiIgracePoKorisnickomImenu(uneseniIgrac);
  }
}
