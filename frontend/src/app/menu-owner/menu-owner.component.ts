import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-owner',
  templateUrl: './menu-owner.component.html',
  styleUrls: ['./menu-owner.component.css']
})
export class MenuOwnerComponent {

  constructor(private router : Router){}

  home(){
    this.router.navigate(['owner'])
  }

  booking(){
    this.router.navigate(['ownerBooking'])
  }

  maintenance(){
    this.router.navigate(['ownerMaintenance'])
  }

  companies(){
    this.router.navigate(['ownerCompanies'])
  }


}
