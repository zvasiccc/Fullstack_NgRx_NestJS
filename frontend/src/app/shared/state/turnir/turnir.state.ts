import { Turnir } from '../../models/turnir';

export interface TurnirState {
  turniri: Turnir[];
  prijavljeniTurniri: Turnir[];
}
export const initialStateTurnir: TurnirState = {
  turniri: [],
  prijavljeniTurniri: [],
};
