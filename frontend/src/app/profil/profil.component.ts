import { Component, Input } from '@angular/core';
import { Igrac } from '../shared/models/igrac';
import { IgracService } from '../services/igrac/igrac.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  trenutnoPrijavljeniIgrac$: Observable<Igrac> = new Observable();
  constructor(private igracService: IgracService) {}
  ngOnInit(): void {
    this.trenutnoPrijavljeniIgrac$ =
      this.igracService.vratiPrijavljenogIgraca();
  }
}
