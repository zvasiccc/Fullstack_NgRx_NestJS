import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreDevtools } from '@ngrx/store-devtools';
import { BehaviorSubject, Observable, exhaustMap, map } from 'rxjs';
import { Igrac } from 'src/app/shared/models/igrac';
import { Turnir } from 'src/app/shared/models/turnir';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { selectTurnirUPrijavi } from 'src/app/shared/state/prijava/prijava.selector';
import { selectTokenPrijavljenogKorisnika } from 'src/app/shared/state/korisnik/korisnik.selector';
import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root',
})
export class TurnirService {
  constructor(
    private store: Store,
    private http: HttpClient,
    private storeService: StoreService
  ) {}
  private turnirUrl = 'http://localhost:3000/turnir/';

  private refreshSubject = new BehaviorSubject<Turnir[]>([]);

  // dodajTurnir(turnir: Turnir) {
  //   this.store.dispatch(kreirajTurnir({ turnir }));
  // }
  getTurniriBaza(): Observable<Turnir[]> {
    const url = this.turnirUrl + 'sviTurniri';
    return this.http.get<Turnir[]>(url);
  }
  getMojiTurniri(): Observable<Turnir[]> {
    return this.refreshSubject.pipe(
      exhaustMap(() => {
        const headers = this.storeService.pribaviHeaders();
        const url = this.turnirUrl + 'mojiTurniri';
        return this.http.get<Turnir[]>(url, { headers });
      })
    );

    //return this.http.get<Turnir[]>(url, { headers });
  }

  refresh() {
    this.refreshSubject.next([]);
  }

  kreirajTurnir(turnir: Turnir) {
    const headers = this.storeService.pribaviHeaders();
    const url = this.turnirUrl + 'dodajTurnir';
    return this.http.post(url, turnir, { headers }).subscribe((p) => p);
  }
  async filtrirajTurnire(
    pretragaNaziv?: string,
    pretragaMesto?: string,
    pretragaPocetniDatum?: string,
    pretragaKrajnjiDatum?: string,
    pretragaPocetnaNagrada?: number,
    pretragaKrajnjaNagrada?: number
  ) {
    let url = this.turnirUrl + 'filtrirajTurnire?';
    if (pretragaNaziv !== undefined && pretragaNaziv !== '')
      url += `pretragaNaziv=${pretragaNaziv}`;
    if (pretragaMesto !== undefined && pretragaMesto !== '')
      url += `pretragaMesto=${pretragaMesto}`;
    if (pretragaPocetniDatum !== undefined && pretragaPocetniDatum !== '')
      url += `pretragaPocetniDatum=${pretragaPocetniDatum}`;
    if (pretragaKrajnjiDatum !== undefined && pretragaKrajnjiDatum !== '')
      url += `pretragaKrajnjiDatum=${pretragaKrajnjiDatum}`;
    if (pretragaPocetnaNagrada !== undefined && pretragaPocetnaNagrada !== 0)
      url += `pretragaPocetnaNagrada=${pretragaPocetnaNagrada}`;
    if (pretragaKrajnjaNagrada !== undefined && pretragaKrajnjaNagrada !== 0)
      url += `pretragaKrajnjaNagrada=${pretragaKrajnjaNagrada}`;

    console.log('saljem url ' + url);
    console.log(' pretraga naziv je+ ' + pretragaNaziv);
    return this.http.get(url);
  }
  async obrisiTurnir(turnirId: number) {
    const headers = this.storeService.pribaviHeaders();
    const url = this.turnirUrl + `obrisiTurnir/${turnirId}`;
    return this.http.delete(url, { headers });
  }
  // vratiPrijavljeneIgrace(turnirId: number): Observable<Igrac[]> {
  //   return this.store
  //     .select(selectPrijavljeniIgraciZaTurnir(turnirId))
  //     .pipe(map((p: any) => p.prijavljeniIgraci)); //this.store.select(selectPrijavljeniIgraciZaTurnir, { id: turnirId });
  // }
  // vratiPrijavljeniTUrnir(): Observable<Turnir> {
  //   return this.store
  //     .select(selectTurnirUPrijavi)
  //     .pipe(map((p: any) => p.turnir));
  //   // return this.store
  //   //   .select(selectPrijavljeniTurniri)
  //   //   .pipe(map((p: any) => p.prijavljeniTurniri));
  // }
}
