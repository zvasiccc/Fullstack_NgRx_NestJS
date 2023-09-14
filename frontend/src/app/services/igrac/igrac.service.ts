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
  constructor(private store: Store) {}
  vratiSveIgrace(): Observable<Igrac[]> {
    return this.store.select(selectSviIgraci).pipe(map((p: any) => p.igraci));
  }
  // vratiPrijavljeneIgraceZaTurnir(turnirId: number): Observable<Igrac[]> {
  //   return this.store.select(selectPrijavljeniIgraciZaTurnir, {
  //     id: turnirId,
  //   }) as Observable<Igrac[]>;
  // }
}
