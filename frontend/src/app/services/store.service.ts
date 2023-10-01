import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { selectTokenPrijavljenogKorisnika } from '../shared/state/korisnik/korisnik.selector';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  jwtTokenString: string = '';
  headers: HttpHeaders = new HttpHeaders();
  constructor(private store: Store) {}
  public pribaviHeaders(): HttpHeaders {
    let jwtTokenObservable = this.store
      .select(selectTokenPrijavljenogKorisnika)
      .pipe(map((p: any) => p.token));

    jwtTokenObservable.subscribe((token: string) => {
      this.jwtTokenString = token;
    });
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtTokenString}`,
    });
    return this.headers;
  }
}
