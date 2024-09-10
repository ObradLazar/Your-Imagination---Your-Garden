import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  constructor (private router : Router, private userService : UserService){}

  korisnicko_ime : string = "";
  lozinka : string = "";
  error_poruka : string = "";

  login(){
    if(this.korisnicko_ime == ""){
      this.error_poruka = "Niste uneli korisnicko ime!"
      return;
    }
    if(this.lozinka == ""){
      this.error_poruka = "Niste uneli lozinku!"
      return;
    }
    this.error_poruka = ""
    this.userService.login(this.korisnicko_ime, this.lozinka).subscribe(
      korisnik => {
        if(korisnik == null){
          this.error_poruka = "Korinisk ne postoji"
        }
        if(korisnik.tip == "admin"){
          localStorage.setItem("ulogovan", korisnik.korisnicko_ime)
          this.router.navigate(['admin'])
        }else{
          this.error_poruka = "Ovo je prijava samo za administratora!"
        }
      }
    )
  }
}

