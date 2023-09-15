import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as TurnirActions from './turnir.actions';
import { TurnirService } from 'src/app/services/turnir/turnir.service';

@Injectable()
export class TurnirEffects {
  constructor(
    private actions$: Actions,
    private turnirService: TurnirService
  ) {}

  getTurniri$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TurnirActions.vratiSveTurnire), // Odgovarajuća akcija
      switchMap(() =>
        this.turnirService.getTurniriBaza().pipe(
          map(
            (turniri) => TurnirActions.vratiSveTurnireSuccess({ turniri }) // Akcija za uspeh
          ),
          catchError(
            (error) => of(TurnirActions.vratiSveTurnireFailure({ error })) // Akcija za grešku
          )
        )
      )
    )
  );
}
