import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {

  constructor (private router : Router, private userService : UserService) {}

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
          this.error_poruka = "Korisnik ne postoji!"
          return
        }
        if(korisnik.tip == "admin"){
          this.error_poruka = "Ovo nije forma za admina!"
          return
        }else if(korisnik.tip == "dekorater"){
          localStorage.setItem("ulogovan", korisnik.korisnicko_ime)
          this.router.navigate(['decorator'])
        }else if (korisnik.tip == "vlasnik"){
          localStorage.setItem("ulogovan", korisnik.korisnicko_ime)
          this.router.navigate(['owner'])
        }else if(korisnik.tip == "neregistrovan"){
          this.error_poruka = "Korisnik i dalje nije odobren od strane administratora!"
        }
      }
    )
  }


}
