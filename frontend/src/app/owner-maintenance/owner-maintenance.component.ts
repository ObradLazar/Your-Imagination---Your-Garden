import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { Maintenance } from '../models/maintenance';
import { Job } from '../models/job';

@Component({
  selector: 'app-owner-maintenance',
  templateUrl: './owner-maintenance.component.html',
  styleUrls: ['./owner-maintenance.component.css']
})
export class OwnerMaintenanceComponent implements OnInit {

  constructor(private jobSerice : JobService){}

  ngOnInit(): void {
    let user = localStorage.getItem("ulogovan")
    if(user != null){
      this.owner_username = user
    }
    this.getAllAcceptedMaintenance()
    //this.getAndSortAllJobs()
    this.getAllMaintenance()
  }

  //DOHVATI SVE ZAVRSNE
  currentDate : Date = new Date()

  allAccepedMaintence : Maintenance[] = []
  allAcceptedNotFinishedMaintenance : Maintenance[] = []

  getAllAcceptedMaintenance(){
    this.jobSerice.getAllMaintenanceAccepted().subscribe(
      data => {
        if(data == null){
          alert("Nema prihvacenih odrzavanja!")
        }else{
          this.allAccepedMaintence = data
          for(let i = 0;i < this.allAccepedMaintence.length; i++){
            let day = parseInt(this.allAccepedMaintence[i].datum_izrade.substring(0,2))
            let month = parseInt(this.allAccepedMaintence[i].datum_izrade.substring(3,5))
            let year = parseInt(this.allAccepedMaintence[i].datum_izrade.substring(6,10))
            let novi_datum = new Date(year, month-1, day)
            if(novi_datum > this.currentDate){
              this.allAcceptedNotFinishedMaintenance.push(this.allAccepedMaintence[i])
            }
          }
        }
      }
    )
  }

  availableForMaintencance : boolean[] = [];
  allJobs : Job[] = [];
  allMaintenanceAccepted : Maintenance[] = [];
  allMaintenanceUnprocessed : Maintenance[] = [];
  allJobsFinished : Job[] = [];
  /*
  getAllMaintenance(){
    this.availableForMaintencance = []
    this.jobSerice.getAllMyJobs(this.owner_username).subscribe(
      data => {
        this.allJobs = data
        //GET PREVIOUS MAINTENANCE
        this.jobSerice.getAllMaintenanceAccepted().subscribe(
          data => {
            this.allMaintenanceAccepted = data
            //alert(data.length)
          }
        )
        this.jobSerice.getAllMaintenanceUnprocessed().subscribe(
          data => {
            this.allMaintenanceUnprocessed = data
            //alert(data.length)
          }
        )

        //alert(data.length)
        //PRONADJI SVE ZAVRSENE
        for(let i = 0; i < this.allJobs.length; i++){
          if(data[i].status == "zavrseno"){
            this.allJobsFinished.push(data[i])
            this.availableForMaintencance.push(this.checkForId(data[i].id))
          }
        }
      }
    )
  }
  */
  getAllMaintenance() {
    this.availableForMaintencance = [];

    this.jobSerice.getAllMyJobs(this.owner_username).subscribe(
      jobsData => {
        this.allJobs = jobsData;

        this.jobSerice.getAllMaintenanceUnprocessed().subscribe(
          acceptedMaintenanceData => {
            this.allMaintenanceAccepted = acceptedMaintenanceData;

            this.jobSerice.getAllMaintenanceAccepted().subscribe(
              unprocessedMaintenanceData => {
                //alert(unprocessedMaintenanceData.length)
                this.allMaintenanceUnprocessed = unprocessedMaintenanceData;

                for (let i = 0; i < this.allJobs.length; i++) {
                  if (this.allJobs[i].status == "zavrseno") {
                    this.allJobsFinished.push(this.allJobs[i]);
                    this.availableForMaintencance.push(this.checkForId(this.allJobs[i].id));
                  }
                }
              }
            );
          }
        );
      }
    );
  }


  parseDateString(dateString: string): Date {
    const [day, month, year] = dateString.split('.').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day);
}

  isSixMonthsApart(dateString : string): boolean {
    let date = this.parseDateString(dateString)

    //Check younger
    const earlierDate = this.currentDate < date ? this.currentDate : date;
    const laterDate = this.currentDate > date ? this.currentDate : date;

    const sixMonthsLater = new Date(earlierDate);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    return laterDate >= sixMonthsLater;
  }

  new_maintenance : Maintenance = new Maintenance();
  company_name : string = ""
  owner_username : string = ""
  id_maintenance_job : number = 0;
  bookMaintenance(id : number){

    this.id_maintenance_job = id
    for(let i = 0; i < this.allJobsFinished.length; i++){
      if(this.allJobsFinished[i].id == this.id_maintenance_job){
        this.company_name = this.allJobsFinished[i].firma;
        break;
      }
    }
    this.new_maintenance.datum_izrade = ""
    this.new_maintenance.vreme_izrade = ""
    this.new_maintenance.firma = this.company_name
    this.new_maintenance.id_posla = this.id_maintenance_job
    this.new_maintenance.status = "N"
    this.new_maintenance.vlasnik = this.owner_username

    //SEND TO BACKEND
    this.jobSerice.createMaintenance(this.new_maintenance).subscribe(
      data => {
        alert(data.text)
        //this.getAndSortAllJobs()
        this.ngOnInit()
      }
    )
  }

  checkForId(id : number) : boolean{
    //PROVERI POSAO

    for(let i = 0; i < this.allJobsFinished.length; i++){
      if(this.allJobsFinished[i].id == id){
        if(!this.isSixMonthsApart(this.allJobsFinished[i].datum_kraja_radova)){
          return false
        }
      }
    }
    //PROVERI DA LI POSTOJI ZAHTEV
    for(let i = 0; i < this.allMaintenanceUnprocessed.length; i++){
      if(this.allAccepedMaintence[i].id_posla == id){
        return false;
      }
    }
    //PROVERI U KOLIKO NE POSTJI ZAHTEV
    for(let i = 0; i < this.allMaintenanceAccepted.length; i++){
      if(this.allMaintenanceAccepted[i].id_posla == id){
        if(!this.isSixMonthsApart(this.allMaintenanceAccepted[i].datum_izrade)){
          return false
        }
      }
    }
    return true;
  }


}
