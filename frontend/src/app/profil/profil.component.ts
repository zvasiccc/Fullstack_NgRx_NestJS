import { Component, Input } from '@angular/core';
import { Igrac } from '../shared/models/igrac';
import { IgracService } from '../services/igrac/igrac.service';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPrijavljeniIgrac } from '../shared/state/igrac/igrac.selector';
import { Organizator } from '../shared/models/organizator';
import { selectPrijavljeniOrganizator } from '../shared/state/organizator/organizator.selector';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  //trenutnoPrijavljeniIgrac$: Observable<Igrac> = new Observable();
  trenutnoPrijavljeniIgrac$: Observable<Igrac | null> = new Observable();
  trenutnoPrijavljeniOrganizator$: Observable<Organizator | null> =
    new Observable();
  constructor(private igracService: IgracService, private store: Store) {
    this.trenutnoPrijavljeniIgrac$ = this.store
      .select(selectPrijavljeniIgrac)
      .pipe(map((p: any) => p?.prijavljeniIgrac));
    this.trenutnoPrijavljeniOrganizator$ = this.store
      .select(selectPrijavljeniOrganizator)
      .pipe(map((p: any) => p?.prijavljeniOrganizator));
  }
}
