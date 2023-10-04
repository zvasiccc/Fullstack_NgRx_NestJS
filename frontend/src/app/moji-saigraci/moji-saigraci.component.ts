import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Igrac } from '../shared/models/igrac';
import { IgracService } from '../services/igrac/igrac.service';
import { Organizator } from '../shared/models/organizator';
import { selectPrijavljeniKorisnik } from '../shared/state/korisnik/korisnik.selector';
import { Store } from '@ngrx/store';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-moji-saigraci',
  templateUrl: './moji-saigraci.component.html',
  styleUrls: ['./moji-saigraci.component.css'],
})
export class MojiSaigraciComponent implements OnInit {
  mojiSaigraci$: Observable<Igrac[]>;
  trenutnoPrijavljeniKorisnik$: Observable<Igrac | Organizator | undefined> =
    this.storeService.pribaviTrenutnoPrijavljenogKorisnika();
  constructor(
    private route: ActivatedRoute,
    private igracService: IgracService,
    private storeService: StoreService,
    private store: Store
  ) {
    this.mojiSaigraci$ = new Observable<Igrac[]>();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const turnirId = params['turnirId'];
      const igracId = params['igracId'];

      // Sada možete pozvati funkciju igracService.vidiSaigrace sa turnirId i igracId
      // za dohvaćanje igrača na temelju tih parametara.
      this.mojiSaigraci$ = this.igracService.vidiSaigrace(turnirId, igracId);
    });
  }
  izbaciIgracaIzTima(igracId: number) {}
  jeVodjaTima(user: any): user is Igrac {
    return user.role === 'igrac' && user.vodjaTima === true;
  }
}
