import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Igrac } from 'src/app/shared/models/igrac';
import { selectSviIgraci } from 'src/app/shared/state/igrac/igrac.selector';
import { selectPrijavljeniIgraciZaTurnir } from 'src/app/shared/state/turnir/turnir.selector';

@Injectable({
  providedIn: 'root',
})
export class IgracService {
  constructor(private store: Store, private http: HttpClient) {}
  private sviIgraciUrl = 'http://localhost:3000/igrac/sviIgraci';
  private prijavljeniIgracUrl = 'http://localhost:3000/igrac/prijavljeniIgrac';
  vratiSveIgrace(): Observable<Igrac[]> {
    return this.http.get<Igrac[]>(this.sviIgraciUrl);
  }
  vratiPrijavljenogIgraca(): Observable<Igrac> {
    return this.http.get<Igrac>(this.prijavljeniIgracUrl);
  }
  dodajIgracaUTim(igrac: Igrac) {
    //postavi ga u store
  }
  // vratiSveIgrace(): Observable<Igrac[]> {
  //   return this.store.select(selectSviIgraci).pipe(map((p: any) => p.igraci));
  // }
  // vratiPrijavljeneIgraceZaTurnir(turnirId: number): Observable<Igrac[]> {
  //   return this.store.select(selectPrijavljeniIgraciZaTurnir, {
  //     id: turnirId,
  //   }) as Observable<Igrac[]>;
  // }
}
