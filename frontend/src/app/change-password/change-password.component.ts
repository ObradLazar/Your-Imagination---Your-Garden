import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { sha3_512 } from 'js-sha3';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor(private userService : UserService, private router : Router){

  }

  old_password : string = "";
  new_password : string = "";
  repeat_password : string = "";

  korisnicko_ime : string = ""
  current_user : User = new User();

  passwordCheck : string = ""
  error_poruka : string = "";

  changePassword(){
    let kor_ime = localStorage.getItem("ulogovan")
    if(kor_ime != null){
      this.korisnicko_ime = kor_ime;
    }
    this.userService.getByUsername(this.korisnicko_ime).subscribe(
      data => {
        this.current_user = data
        if(this.current_user.lozinka != sha3_512(this.old_password)){
          this.error_poruka = "Niste uneli ispravnu staru lozinku"
          return;
        }
        this.error_poruka = ""
        if(this.new_password != this.repeat_password){
          this.error_poruka = "Nove sifre se ne poklapaju"
          return;
        }
        this.passwordCheck = this.checkPassword(this.new_password)
        if(this.passwordCheck != "Dobra lozinka"){
          this.error_poruka = "Lozinka nije odgovarajuceg oblika!"
        }else{
          this.error_poruka = ""
          this.userService.changePassword(this.korisnicko_ime, this.new_password).subscribe(
            data => {
              alert(data.text)
              if(this.current_user.tip == "admin"){
                this.router.navigate(['loginAdmin'])
              }else{
                this.router.navigate(['login'])
              }
            }
          )
        }
      }
    )
  }

  checkPassword(lozinka : string) : string {
    const minDuzina = 6;
    const maxDuzina = 10;
    const regex = /^(?=.*[a-z]{3,})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

    if(lozinka.length > maxDuzina){
      return "Lozinka sadrzi previse karaktera!"
    }
    if(lozinka.length < minDuzina){
      return "Lozinka sadrzi premalo karaktera!"
    }
    if (!/^[A-Za-z]/.test(lozinka)) {
      return "Lozinka ne pocinje slovom!";
    }
    if(!regex.test(lozinka)){
      return "Lozinka ne ispunjava neki od uslova!"
    }
    return "Dobra lozinka"

  }

}
