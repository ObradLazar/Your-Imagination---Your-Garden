import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-owner-booking',
  templateUrl: './owner-booking.component.html',
  styleUrls: ['./owner-booking.component.css']
})
export class OwnerBookingComponent implements OnInit{

  vlasnik : string = ""

  ngOnInit(): void {
    let vlasnikName = localStorage.getItem("ulogovan")
    if(vlasnikName != null){
      this.vlasnik = vlasnikName
    }
    this.getAllMyJobs()
  }

  constructor(private jobService : JobService){}

  //SORTIRAJ
  firstTableJobs : Job[] = []
  secondTableJobs : Job[] = []
  sortJobs(){
    for(let i = 0; i < this.allJobs.length; i++){
      if(this.allJobs[i].status == "neobradjen" || this.allJobs[i].status == "prihvaceno"){
        this.firstTableJobs.push(this.allJobs[i])
      }else{
        this.secondTableJobs.push(this.allJobs[i])
      }
    }
  }


  //DOHVATI SVE POSLOVE
  allJobs : Job[] = []

  getAllMyJobs(){
    this.jobService.getAllMyJobs(this.vlasnik).subscribe(
      data => {
        this.allJobs = data
        this.sortJobs();
      }
    )
  }

}
