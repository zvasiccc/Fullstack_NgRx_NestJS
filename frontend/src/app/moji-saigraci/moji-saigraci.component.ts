import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Igrac } from '../shared/models/igrac';
import { IgracService } from '../services/igrac/igrac.service';

@Component({
  selector: 'app-moji-saigraci',
  templateUrl: './moji-saigraci.component.html',
  styleUrls: ['./moji-saigraci.component.css'],
})
export class MojiSaigraciComponent implements OnInit {
  mojiSaigraci$: Observable<Igrac[]>;

  constructor(
    private route: ActivatedRoute,
    private igracService: IgracService
  ) {
    this.mojiSaigraci$ = new Observable<Igrac[]>();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const turnirId = params['turnirId'];
      const igracId = params['igracId'];

      // Sada možete pozvati funkciju igracService.vidiSaigrace sa turnirId i igracId
      // za dohvaćanje igrača na temelju tih parametara.
      this.mojiSaigraci$ = this.igracService.vidiSaigrace(turnirId, igracId);
    });
  }
}
