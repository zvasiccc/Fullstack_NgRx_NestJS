import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { dodajPreferenceUPrijavu } from '../shared/state/prijava/prijava.actions';
import { map } from 'rxjs';
import { Preference } from '../shared/models/preference';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css'],
})
export class PreferenceComponent {
  zeljenePreference: Preference = {
    potrebanBrojSlusalica: 0,
    potrebanBrojRacunara: 0,
    potrebanBrojTastatura: 0,
    potrebanBrojMiseva: 0,
  };
  constructor(private store: Store) {}
  potvrdiPreference() {
    this.store.dispatch(
      dodajPreferenceUPrijavu({
        preference: this.zeljenePreference,
      })
    );
  }
}
