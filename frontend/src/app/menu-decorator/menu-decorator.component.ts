import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-decorator',
  templateUrl: './menu-decorator.component.html',
  styleUrls: ['./menu-decorator.component.css']
})
export class MenuDecoratorComponent {

  constructor(private router : Router){}

  home(){
    this.router.navigate(['decorator'])
  }

  booking(){
    this.router.navigate(['decoratorBooking'])
  }

  maintenance(){
    this.router.navigate(['decoratorMaintenance'])
  }

  graphs(){
    this.router.navigate(['decoratorGraphs'])
  }

}
