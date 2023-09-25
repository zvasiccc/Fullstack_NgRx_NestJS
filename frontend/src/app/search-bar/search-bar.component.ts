import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TurnirService } from '../services/turnir/turnir.service';

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
  constructor(private turnirService: TurnirService) {}
  async filtrirajTurnire() {
    (
      await this.turnirService.filtrirajTurnire(
        this.pretragaNaziv,
        this.pretragaMesto,
        this.pretragaPocetniDatum,
        this.pretragaKrajnjiDatum
      )
    ).subscribe((rezultati) => {
      this.pretragaRezultati.emit(rezultati);
    });
    // const rezultati = {
    //   naziv: this.pretragaNaziv,
    //   mesto: this.pretragaMesto,
    //   pocetniDatum: this.pretragaPocetniDatum,
    //   krajnjiDatum: this.pretragaKrajnjiDatum,
    // };
    // this.pretragaRezultati.emit(rezultati);
  }
}
