import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {

  constructor(private router : Router){}

  home(){
    this.router.navigate(['admin'])
  }

  addCompany(){
    this.router.navigate(['addCompany'])
  }

  addDecorator(){
    this.router.navigate(['addDecorator'])
  }

  updateUser(){
    this.router.navigate(['updateUser'])
  }

  newUsers(){
    this.router.navigate(['newUsers'])
  }

}
