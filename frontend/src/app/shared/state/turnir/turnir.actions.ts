// turnir.actions.ts
import { createAction, props } from '@ngrx/store';
import { Turnir } from '../../models/turnir';
// Uvezite model ako je potrebno

// Akcija za dodavanje turnira
export const kreirajTurnir = createAction(
  '[Turnir] kreiraj Turnir',
  props<{ turnir: Turnir }>() //sta saljemo uz akciju
);
//sad ove akcija mogu da budu dispached ali neko mora da slusa tj reducer
export const urediTurnir = createAction(
  '[Turnir] Uredi Turnir',
  props<{ turnir: Turnir }>()
);

export const obrisiTurnir = createAction(
  '[Turnir] Obriši Turnir',
  props<{ turnirId: number }>()
);
export const vratiSveTurnire = createAction('[Turnir] Vrati sve turnire');

export const vratiSveTurnireSuccess = createAction(
  '[Turnir] Vrati sve turnire Success',
  props<{ turniri: Turnir[] }>()
);

export const vratiSveTurnireFailure = createAction(
  '[Turnir] Vrati sve turnire Failure',
  props<{ error: any }>()
);
export const vratiPrijavljeneIgrace = createAction(
  '[Turnir] vrati prijavljene igrace za turnir',
  props<{ turnirId: number }>()
);
// export const prijaviSeNaTurnir = createAction(
//   '[Turnir] Prijavi se na turnir',
//   props<{ turnir: Turnir }>()
// );
