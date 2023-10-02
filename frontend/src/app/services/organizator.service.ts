import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Igrac } from '../shared/models/igrac';
import { Organizator } from '../shared/models/organizator';
import { Observable } from 'rxjs';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizatorService {
  constructor(
    private store: Store,
    private http: HttpClient,
    private storeService: StoreService
  ) {}
  registrujSeKaoOrganizator(organizator: Organizator) {
    const url = 'http://localhost:3000/organizator/registrujOrganizatora';
    console.log(JSON.stringify(organizator));
    return this.http.post(url, organizator).subscribe((p) => p);
  }
  daLiJeOrganizatorTurnira(
    korisnikId: number | undefined | null,
    turnirId: number | undefined | null
  ): Observable<boolean> {
    const url = `http://localhost:3000/organizator/daLiJeOrganizatorTurnira/${korisnikId}/${turnirId}`;
    const headers: HttpHeaders = this.storeService.pribaviHeaders();
    return this.http.get<boolean>(url, { headers });
  }
}
