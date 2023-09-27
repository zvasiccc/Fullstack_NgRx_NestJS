import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  korisnickoIme: string = '';
  lozinka: string = '';

  //todo kako saljem login i kako da znam koji tip korisinka je prijavljen
  //todo kako saljem token?
  submitLogin() {}
}
