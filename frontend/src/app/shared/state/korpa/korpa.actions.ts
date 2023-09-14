import { createAction, props } from '@ngrx/store';
import { Turnir } from '../../models/turnir';

export const sviTurniriUKorpi = createAction('[Korpa] Vrati sve turnire');

export const dodajTurnirUKorpu = createAction(
  '[Korpa] Dodaj turnir u korpu',
  props<{ turnir: Turnir }>()
);
export const ukloniTurnirIzKorpe = createAction(
  '[Korpa] ukloni turnir iz korpe',
  props<{ turnirId: number }>()
);
