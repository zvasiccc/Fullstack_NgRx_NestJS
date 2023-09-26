import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Igrac } from '../shared/models/igrac';
import { Organizator } from '../shared/models/organizator';

@Injectable({
  providedIn: 'root',
})
export class OrganizatorService {
  constructor(private store: Store, private http: HttpClient) {}
  registrujSeKaoOrganizator(organizator: Organizator) {
    const url = 'http://localhost:3000/organizator/registrujOrganizatora';
    console.log(JSON.stringify(organizator));
    return this.http.post(url, organizator).subscribe((p) => p);
  }
}
