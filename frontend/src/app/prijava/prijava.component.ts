import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';
import { IgracService } from '../services/igrac/igrac.service';
import { Igrac } from '../shared/models/igrac';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectPotrebanBrojSlusalica } from '../shared/state/prijava/prijava.selector';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css'],
})
export class PrijavaComponent {
  prijavljeniTurnir$: Observable<Turnir> =
    this.turnirService.vratiPrijavljeniTUrnir();
  igraciUTimu$: Observable<Igrac[]> = this.igracService.vratiIgraceIzTima();
  preferencePotrebanBrojSlusalica$: Observable<number> = this.store
    .select(selectPotrebanBrojSlusalica)
    .pipe(map((p: any) => p.potrebanBrojSlusalica));

  constructor(
    private turnirService: TurnirService,
    private igracService: IgracService,
    private router: Router,
    private store: Store
  ) {}
  izaberiPreference() {
    this.router.navigateByUrl('preference');
  }
}
