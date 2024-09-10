import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { JobService } from '../services/job.service';
import { Job } from '../models/job';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  constructor(private router : Router,
     private companyService : CompanyService,
     private userService : UserService,
     private jobService : JobService){}

  ngOnInit(): void {
      this.companyService.getAllCompanies().subscribe(
        data => {
          if(data != null){
            this.allCompanies = data
          }
        }
      )
      this.getAllDecorators();
      this.getAllOwnders();
      this.getAllJobs();
  }

  //PRETRAGA
  searchBool : boolean = false;
  searchMessage : string = "Niste uneli parametre pretrage!"
  searchParam : string = "";

  searchCompanies : Company[] = []

  search(){
    this.searchBool = true;
    this.companyService.searchCompanies(this.searchParam).subscribe(
      data => {
        if(data == null){
          this.searchBool = false
        }else{
          this.searchCompanies = data
        }
      }
    )
  }

  //SORTIRANJE
  nazivRastuce(){
    this.allCompanies.sort((a, b) => {
      return a.naziv.localeCompare(b.naziv);
    });
  }

  nazivOpadajuce(){
    this.allCompanies.sort((a, b) => {
      return b.naziv.localeCompare(a.naziv);
    });
  }

  adresaRastuce(){
    this.allCompanies.sort((a, b) => {
      return a.adresa.localeCompare(b.adresa);
    });
  }

  adresaOpadajuce(){
    this.allCompanies.sort((a, b) => {
      return b.adresa.localeCompare(a.adresa);
    });
  }

  //GET ALL COMPANIES
  allCompanies : Company[] = []

  //GET ALL DECORATORS
  allDecorators : User[] = []
  getAllDecorators(){
    this.userService.getAllDecorators().subscribe(
      data => {
        this.allDecorators = data;
      }
    )
  }


  //GET ALL OWNERS
  allOwners : User[] = []
  getAllOwnders(){
    this.userService.getAllOwners().subscribe(
      data => {
        this.allOwners = data
      }
    )
  }


  //GET SPECIFIC DECORATOR
  getDecorator(korisnicko_ime : string): string{
    for(let i = 0; i < this.allDecorators.length; i++){
      if(this.allDecorators[i].korisnicko_ime == korisnicko_ime){
        return `${this.allDecorators[i].ime} ${this.allDecorators[i].prezime}`
      }
    }
    return ""
  }

  //GET ALL JOBS
  allFinishedJobs : Job[] = []
  allJobs : Job[] = []
  getAllJobs(){
    this.jobService.getAllJobs().subscribe(
      data => {
        this.allJobs = data
        this.getDays()
        for(let i = 0; i < data.length; i++){
          //ZAVERSENO
          if(data[i].status == "zavrseno"){
            this.allFinishedJobs.push(data[i])
          }
          if(this.convertStringToDate(data[i].datum_kraja_radova) >= this.dayBefore){
            this.dayBeforeCounter++;
          }
          if(this.convertStringToDate(data[i].datum_kraja_radova) >= this.weekBefore){
            this.weekBeforeCounter++;
          }
          if(this.convertStringToDate(data[i].datum_kraja_radova) >= this.monthBefore){
            this.monthBeforeCounter++;
          }
        }
      }
    )
  }

  currentDate : Date = new Date();
  dayBefore : Date = new Date();
  weekBefore : Date = new Date();
  monthBefore : Date = new Date();
  dayBeforeCounter : number = 0;
  weekBeforeCounter : number = 0;
  monthBeforeCounter : number = 0;
  getDays(){
    this.dayBefore.setDate(this.dayBefore.getDate() - 1)
    this.weekBefore.setDate(this.weekBefore.getDate() - 7)
    this.monthBefore.setDate(this.monthBefore.getDate() - 30)
  }

  //CONVERT TO DATE
  convertStringToDate(date : string): Date {
    const [day, month, year] = date.split('.').map(Number);
    return new Date(year, month - 1, day);
  }

  prijava(){
    this.router.navigate(['login'])
  }

}
