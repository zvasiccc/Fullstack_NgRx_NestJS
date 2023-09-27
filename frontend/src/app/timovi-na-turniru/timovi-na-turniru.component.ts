import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TurnirService } from '../services/turnir/turnir.service';
import { Observable } from 'rxjs';
import { Prijava } from '../shared/models/prijava';
import { PrijavaService } from '../services/prijava.service';

@Component({
  selector: 'app-timovi-na-turniru',
  templateUrl: './timovi-na-turniru.component.html',
  styleUrls: ['./timovi-na-turniru.component.css'],
})
export class TimoviNaTurniruComponent {
  constructor(
    private route: ActivatedRoute,
    private turnirService: TurnirService,
    private prijavaService: PrijavaService
  ) {}
  prijave$: Observable<Prijava[]> = new Observable();
  turnirId: number = 0;
  ngOnInit() {
    const turnirIdParam = this.route.snapshot.paramMap.get('turnirId');
    if (turnirIdParam !== null) {
      this.turnirId = +turnirIdParam;
      this.prijave$ = this.prijavaService.vratiPrijaveZaTurnir(this.turnirId);
    }
  }
  izbaciTimSaTurnira(prijavaId: number) {
    this.prijavaService.izbaciTimSaTurnira(prijavaId);
  }
}
