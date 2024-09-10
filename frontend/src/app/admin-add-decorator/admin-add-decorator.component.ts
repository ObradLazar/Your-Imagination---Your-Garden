import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-add-decorator',
  templateUrl: './admin-add-decorator.component.html',
  styleUrls: ['./admin-add-decorator.component.css']
})
export class AdminAddDecoratorComponent {
  constructor(private userService : UserService) {}

  korisnicko_ime : string = "";
  lozinka : string = "";
  ime : string = "";
  prezime : string = "";
  pol : string = "";
  adresa : string = "";
  slika : string = "profileImages/default.jpg";
  tip : string = "";
  broj_kreditne_kartice : string = "";
  broj_telefona : string = "";
  mejl : string = "";

  imageFile : File | null = null;

  error_poruka : string = "";

  noviKorisnik : User = new User();

  register(){
    //DA LI SU POPUNJENA SVA POLJA
    if(this.korisnicko_ime == ""){
      this.error_poruka = "Unesite korisnicko ime"
      return
    }
    if(this.lozinka == ""){
      this.error_poruka = "Niste uneli lozinku"
      return
    }
    if(this.ime == "" ||
      this.prezime == "" ||
      this.adresa == "" ||
      this.broj_kreditne_kartice == "" ||
      this.broj_telefona == "" ||
      this.mejl == "" ||
      this.pol == ""){
        this.error_poruka = "Neko od polja nije popunjeno. Sva polja su obavezna!"
        return
      }

    //DA LI POSTOJI KORISNIK SA TIM KORISNICKIM IMENOM
    this.userService.getByUsername(this.korisnicko_ime).subscribe(
      korisnik =>{
        if(korisnik != null){
          if(korisnik.tip == "odbijen"){
            this.error_poruka = "Ovo korisnicko ime je odbijeno, ne sme da se koristi!"
            return;
          }else if(korisnik != null){
            this.error_poruka = "Korisnik sa ovim korisnickim imenom postoji!"
          }
        }
      }
    )

    //DA LI POSTOJI KORISNIK SA TIM MEJLOM
    this.userService.getByMail(this.mejl).subscribe(
      korisnik =>{
        if(korisnik != null){
          this.error_poruka = "Korisnik sa navedenom e-mail adresom vec postoji!"
          return;
        }
      }
    )

    //PROVERI LOZINKU
    if(this.checkPassword(this.lozinka) != "Dobra lozinka"){
      this.error_poruka = this.checkPassword(this.lozinka)
      return
    }

    //POPUNI POLJA
    this.noviKorisnik.korisnicko_ime = this.korisnicko_ime;
    this.noviKorisnik.lozinka = this.lozinka;
    this.noviKorisnik.ime = this.ime;
    this.noviKorisnik.prezime = this.prezime;
    this.noviKorisnik.pol = this.pol;
    this.noviKorisnik.adresa = this.adresa;
    this.noviKorisnik.broj_kreditne_kartice = this.broj_kreditne_kartice;
    this.noviKorisnik.broj_telefona = this.broj_telefona;
    this.noviKorisnik.mejl = this.mejl;
    this.noviKorisnik.slika = this.slika;
    this.noviKorisnik.tip = "dekorater";

    //SLANJE PODATAKA
    this.userService.addUser(this.noviKorisnik).subscribe(
      resp =>{
        if(this.imageFile != null){
          this.userService.changeImage(this.korisnicko_ime, this.imageFile as File).subscribe(
            data => {

            }
          )
        }
        alert(resp.text)
      }
    )
  }


  //UTILITIES
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
