import { Component, OnInit } from '@angular/core';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';
import { Observable } from 'rxjs';
import { KorpaService } from '../services/korpa/korpa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //sviTurniri$: Obs
  sviTurniri$: Observable<Turnir[]> = this.turnirService.vratiSveTurnire(); //new Observable<Turnir[]>(); //observable nad turnirima
  constructor(
    private turnirService: TurnirService,
    private korpaService: KorpaService
  ) {}
  ngOnInit(): void {}
  dodajTurnirUKorpu(turnir: Turnir) {
    this.korpaService.dodajTurnirUKorpu(turnir);
  }
}
