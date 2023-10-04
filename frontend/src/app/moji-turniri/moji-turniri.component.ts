import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Turnir } from '../shared/models/turnir';
import { TurnirService } from '../services/turnir/turnir.service';
import { Igrac } from '../shared/models/igrac';
import { Organizator } from '../shared/models/organizator';
import { selectPrijavljeniKorisnik } from '../shared/state/korisnik/korisnik.selector';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-moji-turniri',
  templateUrl: './moji-turniri.component.html',
  styleUrls: ['./moji-turniri.component.css'],
})
export class MojiTurniriComponent implements OnInit {
  trenutnoPrijavljeniKorisnik$: Observable<Igrac | Organizator | undefined> =
    this.storeService.pribaviTrenutnoPrijavljenogKorisnika();
  //bSub: BehaviorSubject<Turnir[]> = new BehaviorSubject<Turnir[]>([]);
  mojiTurniri$: Observable<Turnir[]> = this.turnirService.getMojiTurniri(); //new Observable<Turnir[]>(); //observable nad turnirima
  constructor(
    private turnirService: TurnirService,
    private storeService: StoreService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    //this.mojiTurniri$.subscribe(this.bSub);
  }

  // onTurnirDelete() {
  //   console.log('Brisem turnir');
  //   //this.bSub.next(this.bSub.value.reverse());
  //   //this.mojiTurniri$ = this.turnirService.getMojiTurniri();
  // }
}
