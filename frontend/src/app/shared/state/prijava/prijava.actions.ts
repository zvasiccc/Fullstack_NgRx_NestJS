import { createAction, props } from '@ngrx/store';
import { Turnir } from '../../models/turnir';

export const prijaviSeNaTurnir = createAction(
  '[Prijava] prijavi se na turnir',
  props<{ turnir: Turnir }>()
);
