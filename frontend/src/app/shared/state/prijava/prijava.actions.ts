import { createAction, props } from '@ngrx/store';
import { Turnir } from '../../models/turnir';
import { Igrac } from '../../models/igrac';
import { Preference } from '../../models/preference';

export const prijaviSeNaTurnir = createAction(
  '[Prijava] prijavi se na turnir',
  props<{ turnir: Turnir }>()
);
export const dodajIgracaUTim = createAction(
  '[Prijava] dodaj igraca u tim',
  props<{ igrac: Igrac }>()
);
export const dodajPreferenceUPrijavu = createAction(
  '[prijava] dodaj preference u prijavu',
  props<{ preference: Preference }>()
);
