import { Component, OnInit } from '@angular/core';
import { Usluga } from '../models/usluga';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-add-company',
  templateUrl: './admin-add-company.component.html',
  styleUrls: ['./admin-add-company.component.css']
})
export class AdminAddCompanyComponent implements OnInit {

  constructor(private companyService : CompanyService, private userService : UserService){

  }

  ngOnInit(): void {
      this.getAllUnemployed();
  }

  dekorater : string = "";
  naziv : string = "";
  adresa : string = "";
  naziv_usluge : string = "";
  cena_usluge : number = 0;
  kontakt_telefon : string = "";
  lista_usluga : Usluga[] = [];
  lista_komentara : string[] = [];
  lista_zaposlenih : string[] = [];
  ocene : number[] = [];
  pocetak_godisnjeg_odmora : string = "";
  kraj_godisnjeg_odmora : string = "";
  radno_vreme : string[] = [];
  nova_usluga : Usluga = new Usluga();

  nova_firma : Company = new Company();

  error_poruka : string = "";

  createCompany () {

    //PROVERE
    if(this.naziv == "" ||
      this.adresa == "" ||
      this.kontakt_telefon == ""){
        this.error_poruka = "Niste uneli neku od sledecih polja: NAZIV, ADRESA, KONTAKT TELEFON"
        return
    }
    if(this.lista_usluga.length == 0){
      this.error_poruka = "Niste uneli ni jednu uslugu firme!"
      return
    }
    if(this.lista_zaposlenih.length < 2){
      this.error_poruka = "Firma mora zadrzati minimum 2 dekoratera!"
      return
    }
    if(this.pocetak_godisnjeg_odmora == "" ||
      this.kraj_godisnjeg_odmora == ""){
        this.error_poruka = "Niste uneli period godišnjeg odmora!"
        return
    }
    if(this.checkDate(this.pocetak_godisnjeg_odmora) == false ||
    this.checkDate(this.kraj_godisnjeg_odmora) == false){
      return;
    }

    //KREIRANJE NOVOG KORISNIKA
    this.nova_firma.naziv = this.naziv
    this.nova_firma.adresa = this.adresa
    this.nova_firma.kontakt_telefon = this.kontakt_telefon
    this.nova_firma.kraj_godisnjeg_odmora = this.kraj_godisnjeg_odmora
    this.nova_firma.lista_komentara = this.lista_komentara
    this.nova_firma.lista_usluga = this.lista_usluga
    this.nova_firma.lista_zaposlenih = this.lista_zaposlenih
    this.nova_firma.ocene = this.ocene
    this.nova_firma.pocetak_godisnjeg_odmora = this.pocetak_godisnjeg_odmora
    this.nova_firma.radno_vreme = this.radno_vreme

    //SLANJE U BAZU
    this.companyService.addCompany(this.nova_firma).subscribe(
      data => {
        alert(data.text)
      }
    )

  }

  checkDate(date: string): boolean {

    const regex = /^(\d{2})\.(\d{2})\.$/;

    const match = date.match(regex);

    if (!match) {
      this.error_poruka = "Nije uneseno u odgovarajucem foramtu (DD.MM.)"
      return false;
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);

    if (day > 31 || month > 12) {
      this.error_poruka = "Netacan broj meseci/dana u mesecu!"
      return false;
    }

    return true;
  }

  addService() {
    if (this.naziv_usluge.trim() !== "" && this.cena_usluge > 0) {
      const usluga = new Usluga();
      usluga.cena_usluge = this.cena_usluge;
      usluga.naziv_usluga = this.naziv_usluge;
      this.lista_usluga.push(usluga);

      this.cena_usluge = 0;
      this.naziv_usluge = "";
    } else {
      this.error_poruka = "Niste popunili sva polja";
    }
  }

  addDecorator() {
    if (this.dekorater.trim() !== "") {
      if(this.svi_nezaposleni_dekorateri.includes(this.dekorater)){
        this.lista_zaposlenih.push(this.dekorater);
        this.dekorater = "";
      }else{
        this.error_poruka = "Dekorater vec zaposljen"
        if(this.svi_nezaposleni_dekorateri.length < 2){
          alert("Trenutno nema dovoljno dekoratera!")
        }else{
          alert(`Trenutni slobodni dekorateri: ${this.svi_nezaposleni_dekorateri}`)
        }
      }
    } else {
      this.error_poruka = "Niste uneli ime dekoratera";
    }
  }

  //PROVERA DEKORATORA
  svi_zaposleni_dekorateri : string[] = []
  svi_dekorateri : User[] = []
  svi_nezaposleni_dekorateri : string[] = []
  sve_firme : Company[] = [];
  getAllUnemployed(){
    this.userService.getAllDecorators().subscribe(
      data => {
        this.svi_dekorateri = data
        this.companyService.getAllCompanies().subscribe(
          comps => {
            this.sve_firme = comps;
            for(let i = 0; i < this.sve_firme.length; i++){
              for(let j = 0; j < this.sve_firme[i].lista_zaposlenih.length; j++){
                this.svi_zaposleni_dekorateri.push(this.sve_firme[i].lista_zaposlenih[j])
              }
            }
            for(let i = 0; i < this.svi_dekorateri.length; i++){
              if(this.svi_zaposleni_dekorateri.includes(this.svi_dekorateri[i].korisnicko_ime) == false){
                this.svi_nezaposleni_dekorateri.push(this.svi_dekorateri[i].korisnicko_ime)
              }
            }
          }
        )
      }
    )
  }



}
