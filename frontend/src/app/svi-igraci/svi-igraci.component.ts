import { Component } from '@angular/core';
import { IgracService } from '../services/igrac/igrac.service';
import { Observable, map } from 'rxjs';
import { Igrac } from '../shared/models/igrac';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';
import { Store } from '@ngrx/store';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-svi-igraci',
  templateUrl: './svi-igraci.component.html',
  styleUrls: ['./svi-igraci.component.css'],
})
export class SviIgraciComponent {
  constructor(
    private igracService: IgracService,
    private turnirService: TurnirService,
    private store: Store,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  sviIgraci$: Observable<Igrac[]> = this.igracService.vratiSveIgrace();
  pretragaIgraci$: Observable<Igrac[]> = new Observable<Igrac[]>();
  uneseniIgrac: string = '';

  ngOnInit() {}
  dodajIgracaUtim(igrac: Igrac) {
    this.igracService.dodajIgracaUTim(igrac);

    this._snackBar.open('igrac je dodat u tim', 'Zatvori', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    }); //?prikazuje se skroz na dno uvek
  }
  pretraziIgrace(uneseniIgrac: string) {
    this.pretragaIgraci$ =
      this.igracService.vratiIgracePoKorisnickomImenu(uneseniIgrac);
  }
  navigirajNaPreference() {
    this.router.navigateByUrl('preference');
  }
}
