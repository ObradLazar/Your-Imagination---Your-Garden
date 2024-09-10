import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {


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

    if(this.mailCheck == false){
      this.error_poruka = "Nepravilno unesen mejl!"
      return
    }

    if(this.phoneCheck == false){
      this.error_poruka = "Nepravilno unesen broj telefona!"
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
    this.noviKorisnik.tip = "neregistrovan";

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

  dina : boolean = false;
  master : boolean = false;
  visa : boolean = false;
  card : number = 0;
  error_credit_card : string = ''
  proveraBrojaKartice(){
    if(this.broj_kreditne_kartice.length < 15){
      this.error_credit_card = "Nedovoljno cifara"
      this.card = 0;
    }else if(this.broj_kreditne_kartice.length > 16){
      this.error_credit_card = "Previse cifara"
      this.card = 0;
    }else if(this.broj_kreditne_kartice.length == 15){
      //IF DINA
      if(this.broj_kreditne_kartice.startsWith('300') ||
      this.broj_kreditne_kartice.startsWith('301') ||
      this.broj_kreditne_kartice.startsWith('302') ||
      this.broj_kreditne_kartice.startsWith('303') ||
      this.broj_kreditne_kartice.startsWith('36') ||
      this.broj_kreditne_kartice.startsWith('38')){
        this.dina = true;
        this.visa = false;
        this.master = false;
        this.error_credit_card = ''
        this.card = 1;
      }else{
        this.error_credit_card = "Pogresan broj kreditne kartice"
      }
    }else if(this.broj_kreditne_kartice.length == 16){
      //IF MASTERS
      if(this.broj_kreditne_kartice.startsWith('51') ||
        this.broj_kreditne_kartice.startsWith('52') ||
        this.broj_kreditne_kartice.startsWith('53') ||
        this.broj_kreditne_kartice.startsWith('54') ||
        this.broj_kreditne_kartice.startsWith('55')){
          this.master = true;
          this.dina = false;
          this.visa = false;
          this.card = 2;
          this.error_credit_card = '';
        }else if(this.broj_kreditne_kartice.startsWith('4539') ||
        this.broj_kreditne_kartice.startsWith('4556') ||
        this.broj_kreditne_kartice.startsWith('4916') ||
        this.broj_kreditne_kartice.startsWith('4532') ||
        this.broj_kreditne_kartice.startsWith('4929') ||
        this.broj_kreditne_kartice.startsWith('4485') ||
        this.broj_kreditne_kartice.startsWith('4716')){
          this.master = false;
          this.dina = false;
          this.visa = true;
          this.card = 3;
          this.error_credit_card = '';
      }else{
        this.error_credit_card = 'Greska pri unosu broj kreditne kartice'
        this.dina = false;
        this.visa = false;
        this.master = false;
        this.card = 0;
      }
    }
  }

  mailCheck : boolean = false;
  error_mail_poruka : string = ''
  checkMail(){
    const mailRegex = /^[a-zA-Z0-9]{3,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;
    if(mailRegex.test(this.mejl)){
      this.error_mail_poruka = ''
      this.mailCheck = true
    }else{
      this.error_mail_poruka = 'Nepravilno unesen mejl'
    }
  }

  phoneCheck : boolean = false;
  error_phone_poruka : string = ""
  checkPhone(){
    const phoneRegex = /^\+381\d{8,9}$/;
    if(this.broj_telefona.length == 0){
      this.error_phone_poruka = ''
    }
    if(phoneRegex.test(this.broj_telefona)){
      this.error_phone_poruka = ''
      this.phoneCheck = true
    }else{
      this.error_phone_poruka = "Nije odgovarajuceg format\n Proverite da li pocinje sa +381"
    }
  }

}
