import { createAction, props } from '@ngrx/store';
import { Igrac } from '../../models/igrac';

export const vratiSveIgrace = createAction('[Igrac] vrati sve igrace');
export const vratiSveIgracSuccess = createAction(
  '[Igrac] vrati sve igrace success',
  props<{ igraci: Igrac[] }>()
);
export const vratiSveIgraceFailure = createAction(
  '[Igrac] vrati sve igrace failure',
  props<{ error: any }>()
);
export const postaviPrijavljenogIgraca = createAction(
  '[Igrac] Postavi Prijavljenog Igraca',
  props<{ prijavljeniIgrac: Igrac }>()
);
export const odjaviPrijavljenogIgraca = createAction(
  '[Igrac] odjavi Prijavljenog Igraca'
);
