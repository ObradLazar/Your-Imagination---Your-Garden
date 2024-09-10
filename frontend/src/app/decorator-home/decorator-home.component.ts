import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-decorator-home',
  templateUrl: './decorator-home.component.html',
  styleUrls: ['./decorator-home.component.css']
})
export class DecoratorHomeComponent implements OnInit {

  constructor(private router : Router, private userService : UserService){

  }

  current_decorator : User = new User();
  korisnicko_ime : string = "";

  ngOnInit(): void {
    let kor_ime = localStorage.getItem("ulogovan")
    if(kor_ime != null){
      this.korisnicko_ime = kor_ime
    }else{
      this.router.navigate(['login'])
      alert("Doslo je do greske, pokusajte ponovo!")
    }

    this.userService.getByUsername(this.korisnicko_ime).subscribe(
      data => {
        if(data != null){
          this.current_decorator = data
        }else{
          alert("Korisnik ne postoji u bazi")
        }
      }
    )
  }

  //UPDATE USER

  stavkaZaAzuriranje : string = "";
  nova_vrednost : string = "";
  error_poruka : string = "";
  imageFile : File | null = null;

  update(){
    if(this.stavkaZaAzuriranje == null){
      this.error_poruka = "Niste uneli sta se azurira!"
      return
    }
    if(this.nova_vrednost == null){
      this.error_poruka = "Niste uneli novu vrednost"
      return
    }
    this.error_poruka = ""
    if(this.stavkaZaAzuriranje == "ime"){
      this.userService.changeFirstname(this.current_decorator.korisnicko_ime, this.nova_vrednost).subscribe(
        data => {
          alert(data.text)
          this.userService.getByUsername(this.korisnicko_ime).subscribe(
            korisnik => {
              this.current_decorator = korisnik;
            }
          )
        }
      )
    }else if(this.stavkaZaAzuriranje == 'prezime'){
      this.userService.changeLastname(this.current_decorator.korisnicko_ime, this.nova_vrednost).subscribe(
        data => {
          alert(data.text)
          this.userService.getByUsername(this.korisnicko_ime).subscribe(
            korisnik => {
              this.current_decorator = korisnik;
            }
          )
        }
      )
    }else if(this.stavkaZaAzuriranje == 'adresa'){
      this.userService.changeAdress(this.current_decorator.korisnicko_ime, this.nova_vrednost).subscribe(
        data => {
          alert(data.text)
          this.userService.getByUsername(this.korisnicko_ime).subscribe(
            korisnik => {
              this.current_decorator = korisnik;
            }
          )
        }
      )
    }else if(this.stavkaZaAzuriranje == 'broj_telefona'){
      this.userService.changePhoneNumber(this.current_decorator.korisnicko_ime, this.nova_vrednost).subscribe(
        data => {
          alert(data.text)
          this.userService.getByUsername(this.korisnicko_ime).subscribe(
            korisnik => {
              this.current_decorator = korisnik;
            }
          )
        }
      )

    }else if(this.stavkaZaAzuriranje == 'broj_kreditne_kartice'){
      this.userService.changeCardNumber(this.current_decorator.korisnicko_ime, this.nova_vrednost).subscribe(
        data => {
          alert(data.text)
          this.userService.getByUsername(this.korisnicko_ime).subscribe(
            korisnik => {
              this.current_decorator = korisnik;
            }
          )
        }
      )
    }else if(this.stavkaZaAzuriranje == 'profilna_slika'){
      if(this.imageFile != null){
        this.userService.changeImage(this.korisnicko_ime, this.imageFile as File).subscribe(
          data => {
            alert(data.text)
            this.userService.getByUsername(this.korisnicko_ime).subscribe(
              korisnik => {
                this.current_decorator = korisnik;
              }
            )
          }
        )
      }
    }else{
      this.userService.changeMail(this.current_decorator.korisnicko_ime, this.nova_vrednost).subscribe(
        data => {
          alert(data.text)
          this.userService.getByUsername(this.korisnicko_ime).subscribe(
            korisnik => {
              this.current_decorator = korisnik;
            }
          )
        }
      )
    }
  }

  //UTILITIES

  logout(){
    localStorage.clear()
    this.router.navigate(['login'])
  }

  promeniLozinku(){
    localStorage.setItem("ulogovan", this.korisnicko_ime)
    this.router.navigate(['changePassword'])
  }

  loadFile(event : any){
    this.imageFile = event.target.files[0];

      const selectedImageURL = event.target.result;

      let image = new Image();
      image.src = URL.createObjectURL(this.imageFile as File);

      image.onload = () => {
        if (image.height < 100 || image.width < 100 || image.height > 300 || image.width > 300) {
          this.error_poruka = "Slika mora biti odgovarajuce velicine!"
          this.imageFile = null;
        } else {
          this.error_poruka = "";
        }
      };
      image.onerror = () => {
        this.error_poruka = "Doslo je do greske!";
        this.imageFile = null;
      }
  }

}
