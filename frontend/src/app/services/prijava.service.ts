import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class PrijavaService {
  constructor(private store: Store, private http: HttpClient) {}
  posaljiPrijavuUBazu() {}
}
