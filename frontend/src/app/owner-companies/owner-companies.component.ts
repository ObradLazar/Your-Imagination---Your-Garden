import { Component, Input, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Company } from '../models/company';

@Component({
  selector: 'app-owner-companies',
  templateUrl: './owner-companies.component.html',
  styleUrls: ['./owner-companies.component.css']
})
export class OwnerCompaniesComponent implements OnInit {

  constructor(private companyService : CompanyService, private userService : UserService){

  }

  @Input() c: { ocene: number[] } = { ocene: [] };
  trees: number[] = Array(5).fill(0);

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe(
      data => {
        if(data != null){
          this.allCompanies = data
        }
      }
    )
    this.getAllDecorators();
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

  //PROSECNA OCENA
  calculateAverageGrade(lista_ocena : Array<number>) : number{
    let sum = 0;
    for(let i = 0; i < lista_ocena.length;i++){
      sum = sum + lista_ocena[i]
    }
    if(sum == 0){
      return 0
    }else{
      return parseFloat((sum / lista_ocena.length).toFixed(2))
    }
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

    //GET SPECIFIC DECORATOR
    getDecorator(korisnicko_ime : string): string{
      for(let i = 0; i < this.allDecorators.length; i++){
        if(this.allDecorators[i].korisnicko_ime == korisnicko_ime){
          return `${this.allDecorators[i].ime} ${this.allDecorators[i].prezime}`
        }
      }
      return ""
    }

}
