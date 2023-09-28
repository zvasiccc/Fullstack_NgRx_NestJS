import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { IgracService } from '../services/igrac/igrac.service';
import { OrganizatorService } from '../services/organizator.service';
import { mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  korisnickoIme: string = '';
  lozinka: string = '';
  isIgrac: boolean = false; // Initialize to false
  isOrganizator: boolean = false; // Initialize to false
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private igracService: IgracService,
    private organizatorService: OrganizatorService
  ) {}

  async prijaviSe() {
    const tokenObservable = this.loginService.posaljiZahtevZaLogin(
      this.korisnickoIme,
      this.lozinka
    );
    let jwtToken: any;
    (await tokenObservable).subscribe(async (token: any) => {
      jwtToken = token.access_token;
      console.log(jwtToken);
      const headers = new HttpHeaders({
        Authorization: `Bearer ${jwtToken}`,
      });
      const url = 'http://localhost:3000/igrac/vratiIgracaIzTokena';
      const response: any = await this.http.get(url, { headers }).toPromise();
      console.log(response);
    });
    // tokenObservable
    //   .pipe(
    //     mergeMap((token: any) => {
    //       const jwtToken = token.access_token;
    //       const headers = new HttpHeaders({
    //         Authorization: `Bearer ${jwtToken}`,
    //       });

    //       if (this.isIgrac) {
    //         const url = 'http://localhost:3000/igrac/vratiIgracaIzTokena';
    //         return this.http.get(url, { headers });
    //       }

    //       return of(null); // Vratite Observable sa null ako nije igrac
    //     })
    //   )
    //   .subscribe(
    //     (response: any) => {
    //       console.log(response);
    //       // Ovde možete obaviti dodatne akcije nakon što dobijete odgovor
    //     },
    //     (error: any) => {
    //       console.error(error);
    //       // Obradite grešku ovde
    //     }
    //   );
  }
}
