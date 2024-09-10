import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';
import { Usluga } from '../models/usluga';
import { Job } from '../models/job';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit{

  constructor(private route : ActivatedRoute, private companyService : CompanyService, private jobService : JobService) {}

  ngOnInit(): void {
    let korisnik = localStorage.getItem("ulogovan")
    if(korisnik != null){
      this.korisnik = korisnik
    }
    this.getNameFromRoute();
    this.getCompanyByName();
    this.check_list = new Array(this.currentCompany.lista_usluga.length).fill(false);
    this.jobService.getAllJobs().subscribe(
      data => {
        this.allJobs = data
        this.findHighestID()
      }
    )
  }

  korisnik : string = ""

  //GET COMPANY BY NAME
  currentCompany : Company = new Company();

  getCompanyByName(){
    this.companyService.getCompanyByName(this.naziv).subscribe(
      data => {
        this.currentCompany = data
      }
    )
  }

  //GET NAME FROM ROUTE
  naziv : string = "";
  getNameFromRoute(){
    this.route.params.subscribe(
      params => {
        this.naziv = params['naziv'];
      }
    )
  }

  //MAKE RESERVATION
  vlasnik : string = "";
  datum : string = "";
  vreme : string = "";
  kvadratura_baste : number = 0;
  kvadratura_plava : number = 0;
  kvadratura_zelena : number = 0;
  kvadratura_braon : number = 0;
  tip_baste : string = "";
  broj_stolova : number = 0;
  broj_stolica : number = 0;
  dodatni_zahtevi : string = "";
  lista_usluga : Usluga[] = [];
  broj_bazena : number = 0;
  broj_fontana : number = 0;


  error_poruka = "";

  string_datum : string = ""
  datum_i_vreme : Date = new Date()

  step : number = 1;

  novi_zahtev : Job = new Job();

  makeReservation(){
    //PROVERI VREDNOSTI
    if(this.tip_baste == "privatna_basta"){
      if(this.kvadratura_plava == 0 && this.kvadratura_braon == 0 && this.kvadratura_zelena == 0){
        this.error_poruka = "Niste uneli kvadrature"
        return
      }
    }else{
      if(this.kvadratura_zelena == 0 && this.kvadratura_plava == 0 && this.broj_stolica == 0 && this.broj_stolova == 0){
        this.error_poruka = "Niste uneli nista od podataka u vezi baste!"
        return
      }
    }

    this.datum_i_vreme = new Date(this.string_datum)
    //PROVERA DATUMA
    const day = this.datum_i_vreme.getDate();
    const month = this.datum_i_vreme.getMonth() + 1;
    let vacationDayStart = parseInt(this.currentCompany.pocetak_godisnjeg_odmora.substring(0,2))
    let vacationDayEnd = parseInt(this.currentCompany.kraj_godisnjeg_odmora.substring(0,2))
    let vacationMonthStart = parseInt(this.currentCompany.pocetak_godisnjeg_odmora.substring(3,5))
    let vacationMonthEnd = parseInt(this.currentCompany.kraj_godisnjeg_odmora.substring(3,5))

    if(month == vacationMonthStart){
      if(day >= vacationDayStart){
        this.error_poruka = "Tada je period godisnjeg odmora firme!"
        return
      }
    }else if(month == vacationMonthEnd){
      if(day <= vacationDayEnd){
        this.error_poruka = "Tada je period godisnjeg odmora firme!"
        return
      }
    }

    //POKUPI USLUGE
    for(let i = 0; i < this.check_list.length; i++){
      if(this.check_list[i] == true){
        this.lista_usluga.push(this.currentCompany.lista_usluga[i])
      }
    }

    //KREIRAJ NOVI ZAHTEV
    this.novi_zahtev.broj_stolica = this.broj_stolica
    this.novi_zahtev.broj_stolova = this.broj_stolova
    this.novi_zahtev.datum_kraja_radova = this.datum_i_vreme.getDate().toString().padStart(2, '0') + "." + (this.datum_i_vreme.getMonth() + 1).toString().padStart(2, '0')
                                            + "." + this.datum_i_vreme.getFullYear().toString() + "."
    this.novi_zahtev.dekorater = ""
    this.novi_zahtev.dodatni_zahtevi = this.dodatni_zahtevi
    this.novi_zahtev.firma = this.currentCompany.naziv
    this.novi_zahtev.komentar = ""
    this.novi_zahtev.kvadratura_baste = this.kvadratura_baste
    this.novi_zahtev.kvadratura_braon = this.kvadratura_braon
    this.novi_zahtev.kvadratura_plava = this.kvadratura_plava
    this.novi_zahtev.kvadratura_zelena = this.kvadratura_zelena
    this.novi_zahtev.lista_usluga = this.lista_usluga
    this.novi_zahtev.ocena = 0;
    this.novi_zahtev.status = "neobradjen"
    this.novi_zahtev.tip_baste = this.tip_baste
    this.novi_zahtev.vlasnik = this.korisnik
    this.novi_zahtev.id = this.novi_id;
    this.novi_zahtev.broj_bazena = this.broj_bazena
    this.novi_zahtev.broj_fontana = this.broj_fontana

    //POSAJI NA BAZU
    this.jobService.addJob(this.novi_zahtev).subscribe(
      data => {
        alert(data.text)
      }
    )
  }

  nextStep(){
    if(this.datum_i_vreme == null){
      this.error_poruka = "Niste uneli datum i vreme!"
      return
    }
    if(this.kvadratura_baste <= 0){
      this.error_poruka = "Niste uneli validnu vrednost kvadrature baste"
      return
    }
    if(this.tip_baste == ""){
      this.error_poruka = "Niste odabrali tip baste!"
      return
    }
    if(this.tip_baste == "privatna_basta"){
      this.step = 2;
    }else{
      this.step = 3;
    }
  }

  //ODABRANE USLUGE
  check_list : boolean[] = []

  //NADJI NAJVECI ID
  novi_id : number = 0;
  allJobs : Job[] = []

  findHighestID(){
    for(let i = 0; i < this.allJobs.length; i++){
      if(this.allJobs[i].id > this.novi_id){
        this.novi_id = this.allJobs[i].id
      }
    }
    this.novi_id++;
  }

  //LOAD GARDEN
  @ViewChild('myCanvas', { static: false }) myCanvas?: ElementRef<HTMLCanvasElement>;

  blueCirclesCount: number = 0;
  blueRectanglesCount: number = 0;
  fileLoaded: boolean = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          this.fileLoaded = true;

          setTimeout(() => {
            if (this.myCanvas) {
              this.drawShapes(data);
            } else {
              console.error('Canvas trenutno nije dostupan.');
            }
          }, 0);

        } catch (error) {
          console.error('Greska pri prosledjivanju JSON:', error);
        }
      };

      reader.readAsText(file);
    }
  }

  drawShapes(data: any): void {
    if (!this.myCanvas) {
      console.error('Canvas nije slobodan.');
      return;
    }

    const canvas = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('2D context is not available.');
      return;
    }

    this.blueCirclesCount = 0;
    this.blueRectanglesCount = 0;

    for (const [color, rectangles] of Object.entries(data.shapes.rectangles)) {
      if (color === 'blue') {
        this.blueRectanglesCount = (rectangles as any[]).length;
      }
      ctx.fillStyle = color;
      (rectangles as any[]).forEach((rect: any) => {
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      });
    }

    for (const [color, circles] of Object.entries(data.shapes.circles)) {
      if (color === 'blue') {
        this.blueCirclesCount = (circles as any[]).length;
      }
      ctx.fillStyle = color;
      (circles as any[]).forEach((circle: any) => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    this.broj_bazena = this.blueRectanglesCount
    this.broj_fontana = this.blueCirclesCount
    //console.log(this.broj_bazena)
    //console.log(this.broj_fontana)
  }

  //END
}
