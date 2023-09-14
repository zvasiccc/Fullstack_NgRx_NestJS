import { Component } from '@angular/core';
import { Igrac } from '../shared/models/igrac';

@Component({
  selector: 'app-igrac',
  templateUrl: './igrac.component.html',
  styleUrls: ['./igrac.component.css'],
})
export class IgracComponent {
  igrac: Igrac = new Igrac(0, '', '', 0);
  constructor() {}
}
