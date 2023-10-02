import { Igrac } from '../shared/models/igrac';
import { TurnirService } from '../services/turnir/turnir.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Turnir } from '../shared/models/turnir';
import { StoreService } from '../services/store.service';
@Component({
  selector: 'app-igraci-na-turniru',
  templateUrl: './igraci-na-turniru.component.html',
  styleUrls: ['./igraci-na-turniru.component.css'],
})
export class IgraciNaTurniruComponent {
  turnirId: number = 0;
  prijavljeniIgraci$: Observable<Igrac[]> =
    this.storeService.vratiPrijavljeneIgrace(this.turnirId);
  constructor(
    private route: ActivatedRoute,
    private turnirService: TurnirService,
    private storeService: StoreService
  ) {}
  ngOnInit() {
    const turnirIdParam = this.route.snapshot.paramMap.get('turnirId');
    if (turnirIdParam !== null) {
      this.turnirId = +turnirIdParam;
      this.prijavljeniIgraci$ = this.storeService.vratiPrijavljeneIgrace(
        this.turnirId
      );
    }
  }
}
