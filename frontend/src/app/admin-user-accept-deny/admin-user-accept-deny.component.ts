import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-user-accept-deny',
  templateUrl: './admin-user-accept-deny.component.html',
  styleUrls: ['./admin-user-accept-deny.component.css']
})
export class AdminUserAcceptDenyComponent implements OnInit {

  constructor(private userService : UserService){}

  ngOnInit(): void {
    this.userService.getAllUnregistered().subscribe(
      data => {
        if(data != null){
          this.sviNeregistrovani = data
        }
      }
    )
  }

  sviNeregistrovani : User[] = [];

  acceptUser(korisnicko_ime : string){
    this.userService.acceptUser(korisnicko_ime).subscribe(
      data => {
        alert(data.text)
        this.userService.getAllUnregistered().subscribe(
          data => {
            if(data != null){
              this.sviNeregistrovani = data
            }
          }
        )
      }
    )
  }

  denyUser(korisnicko_ime : string){
    this.userService.denyUser(korisnicko_ime).subscribe(
      data => {
        alert(data.text)
        this.userService.getAllUnregistered().subscribe(
          data => {
            if(data != null){
              this.sviNeregistrovani = data
            }
          }
        )
      }
    )
  }



}
