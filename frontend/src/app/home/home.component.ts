import { Component, OnInit } from '@angular/core';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';
import { Observable } from 'rxjs';
import { KorpaService } from '../services/korpa/korpa.service';
import { IgracService } from '../services/igrac/igrac.service';
import { Igrac } from '../shared/models/igrac';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sviTurniri$: Observable<Turnir[]> = this.turnirService.getTurniriBaza(); //new Observable<Turnir[]>(); //observable nad turnirima
  // sviIgraci$: Observable<Igrac[]> = this.igracService.vratiSveIgrace();
  constructor(
    private turnirService: TurnirService,
    private igracService: IgracService
  ) {}
  ngOnInit(): void {}
}
