//import { KorpaState } from './korpa/korpa.state';
import { PrijavaState } from './prijava/prijava.state';
import { TurnirState } from './turnir/turnir.state';

export interface AppState {
  turnirState: TurnirState;
  prijavaState: PrijavaState;
  //korpaState: KorpaState;
}
