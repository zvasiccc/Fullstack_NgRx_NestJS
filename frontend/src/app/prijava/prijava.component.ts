import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';
import { IgracService } from '../services/igrac/igrac.service';
import { Igrac } from '../shared/models/igrac';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css'],
})
export class PrijavaComponent {
  prijavljeniTurnir$: Observable<Turnir> =
    this.turnirService.vratiPrijavljeniTUrnir();
  igraciUTimu$: Observable<Igrac[]> = this.igracService.vratiIgraceIzTima();
  constructor(
    private turnirService: TurnirService,
    private igracService: IgracService
  ) {}
}
