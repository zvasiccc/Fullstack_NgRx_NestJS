import { Igrac } from '../../models/igrac';
import { Organizator } from '../../models/organizator';

export interface KorisnikState {
  prijavljeniKorisnik: Organizator | Igrac | undefined;
}
export const initialStateKorisnik: KorisnikState = {
  prijavljeniKorisnik: undefined,
};
