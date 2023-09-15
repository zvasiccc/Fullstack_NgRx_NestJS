import { Component, Input } from '@angular/core';
import { Igrac } from '../shared/models/igrac';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  @Input() igrac!: Igrac;
  constructor() {}
}
