import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  navigirajNaKreiranjeTurnira() {
    this.router.navigateByUrl('kreiranjeTurnira');
  }
  // navigirajNaKorpu() {
  //   this.router.navigateByUrl('korpa');
  // }
  navigirajNaPocetnu() {
    this.router.navigateByUrl('');
  }
  navigirajNaProfil() {
    this.router.navigateByUrl('profil');
  }
  navigirajNaPrijavljivanje() {
    this.router.navigateByUrl('login');
  }
}
