import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private userService : UserService, private router : Router, private companyService : CompanyService){}

  ngOnInit(): void {
    this.userService.getAllDecorators().subscribe(
      data => {
        if(data != null){
          this.allDecorators = data
        }else {
          alert("Trenutno nema dekoratora u sistemu")
        }
      }
    )
    this.userService.getAllOwners().subscribe(
      data => {
        if(data != null){
          this.allOwners = data
        }else{
          alert("Trenutno nema vlasnika u sistemu")
        }
      }
    )
    this.companyService.getAllCompanies().subscribe(
      data => {
        this.allCompanies = data
      }
    )
  }

  allDecorators : User[] = []
  allOwners : User[] = []
  allCompanies : Company[] = []



  logout(){
    localStorage.clear()
    this.router.navigate(['loginAdmin'])
  }

  promeniLozinku(){
    localStorage.setItem("ulogovan", "admin")
    this.router.navigate(['changePassword'])
  }

}
