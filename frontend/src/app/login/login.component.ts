import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  korisnickoIme: string = '';
  lozinka: string = '';

  submitLogin() {
    // Ovde možete postaviti logiku za proveru korisničkog imena i lozinke
    if (this.korisnickoIme === 'zeljko' && this.lozinka === 'zeljko') {
      // Uspela prijava
      alert('Uspešno ste se prijavili.');
    } else {
      // Neuspešna prijava
      alert('Pogrešno korisničko ime ili lozinka.');
    }
  }
}
