import { Igrac } from '../shared/models/igrac';
import { TurnirService } from '../services/turnir/turnir.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Turnir } from '../shared/models/turnir';
@Component({
  selector: 'app-igraci-na-turniru',
  templateUrl: './igraci-na-turniru.component.html',
  styleUrls: ['./igraci-na-turniru.component.css'],
})
export class IgraciNaTurniruComponent {
  turnirId: number = 0;
  prijavljeniIgraci$: Observable<Igrac[]> = new Observable<Igrac[]>();
  constructor(
    private route: ActivatedRoute,
    private turnirService: TurnirService
  ) {}
  ngOnInit() {
    const turnirIdParam = this.route.snapshot.paramMap.get('turnirId');
    if (turnirIdParam !== null) {
      this.turnirId = +turnirIdParam;
      this.prijavljeniIgraci$ = this.turnirService.vratiPrijavljeneIgrace(
        this.turnirId
      );
    }
  }
}
