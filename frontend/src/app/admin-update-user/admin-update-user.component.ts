import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-update-user',
  templateUrl: './admin-update-user.component.html',
  styleUrls: ['./admin-update-user.component.css']
})
export class AdminUpdateUserComponent {

  constructor(private userService : UserService){}

  errorPorukaAzuriranje : string = "";
  stavkaZaAzuriranje : string = "";
  korisnikKojiSeAzurira : string = "";
  novaVrednost : string = ""

  azuriraj(){
    if(this.stavkaZaAzuriranje == ""){
      this.errorPorukaAzuriranje = "Niste uneli sta se azurira!"
      return
    }
    if(this.novaVrednost == ""){
      this.errorPorukaAzuriranje = "Niste uneli novu vrednost"
      return
    }
    this.errorPorukaAzuriranje = ""
    if(this.stavkaZaAzuriranje == "ime"){
      this.userService.changeFirstname(this.korisnikKojiSeAzurira, this.novaVrednost).subscribe(
        data => {
          alert(data.text)
        }
      )
    }else if(this.stavkaZaAzuriranje == 'prezime'){
      this.userService.changeLastname(this.korisnikKojiSeAzurira, this.novaVrednost).subscribe(
        data => {
          alert(data.text)
        }
      )
    }else if(this.stavkaZaAzuriranje == 'adresa'){
      this.userService.changeAdress(this.korisnikKojiSeAzurira, this.novaVrednost).subscribe(
        data => {
          alert(data.text)
        }
      )
    }else if(this.stavkaZaAzuriranje == 'broj_telefona'){
      this.userService.changePhoneNumber(this.korisnikKojiSeAzurira, this.novaVrednost).subscribe(
        data => {
          alert(data.text)
        }
      )

    }else if(this.stavkaZaAzuriranje == 'broj_kreditne_kartice'){
      this.userService.changeCardNumber(this.korisnikKojiSeAzurira, this.novaVrednost).subscribe(
        data => {
          alert(data.text)
        }
      )
    }else{
      this.userService.changeMail(this.korisnikKojiSeAzurira, this.novaVrednost).subscribe(
        data => {
          alert(data.text)
        }
      )
    }


  }
}
