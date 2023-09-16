// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable, map } from 'rxjs';
// import { Turnir } from 'src/app/shared/models/turnir';
// import * as KorpaActions from 'src/app/shared/state/korpa/korpa.actions';
// import { selectSviTurniriKorpa1 } from 'src/app/shared/state/korpa/korpa.selector';
// @Injectable({
//   providedIn: 'root',
// })
// export class KorpaService {
//   constructor(private store: Store) {}
//   dodajTurnirUKorpu(turnir: Turnir) {
//     this.store.dispatch(KorpaActions.dodajTurnirUKorpu({ turnir }));
//   }
//   sviTurniriUKorpi(): Observable<Turnir[]> {
//     //dohvata se iz store
//     return this.store
//       .select(selectSviTurniriKorpa1)
//       .pipe(map((p: any) => p.turniri));
//   }
// }
