import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  // U komponenti za pretragu (search-bar.component.ts)
  @Output() pretragaRezultati: EventEmitter<any> = new EventEmitter();
  pretragaNaziv: string = '';
  pretragaMesto: string = '';
  pretragaPocetniDatum: string = '';
  pretragaKrajnjiDatum: string = '';
  pretraziTurnire() {
    const rezultati = {
      naziv: this.pretragaNaziv,
      mesto: this.pretragaMesto,
      pocetniDatum: this.pretragaPocetniDatum,
      krajnjiDatum: this.pretragaKrajnjiDatum,
    };
    this.pretragaRezultati.emit(rezultati);
  }
}
