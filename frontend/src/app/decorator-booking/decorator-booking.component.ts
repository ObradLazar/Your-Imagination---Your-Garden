import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-decorator-booking',
  templateUrl: './decorator-booking.component.html',
  styleUrls: ['./decorator-booking.component.css']
})
export class DecoratorBookingComponent implements OnInit {

  constructor(private jobService : JobService){

  }

  currentDecorator : string = ""

  ngOnInit(): void {
    let decorator = localStorage.getItem("ulogovan")
    if(decorator != null){
      this.currentDecorator = decorator
    }
    this.getAllUnprocessedJobs()
    this.getAllMyAcceptedJobs()
  }

  odbijena_komentar : string = ""


  //DOHVATI SVE POSLOVE KOJI NISU OBRADJENI
  unprocessedJobs : Job[] = []
  getAllUnprocessedJobs(){
    this.jobService.getAllUnprocessedJobs().subscribe(
      data => {
        this.unprocessedJobs = data
        this.sortDates()
      }
    )
  }

  //DOHVATI SVE POSLOVE MOJE KOJI SU PRIHVACENI
  allMyJobs : Job[] = []
  allAcceptedJobs : Job[] = []

  getAllMyAcceptedJobs(){
    this.jobService.getAllMyJobsAsDecorator(this.currentDecorator).subscribe(
      data => {
        this.allMyJobs = data
        for(let i = 0; i < this.allMyJobs.length; i++){
          if(this.allMyJobs[i].status == "prihvaceno"){
            this.allAcceptedJobs.push(this.allMyJobs[i])
          }
        }
      }
    )
  }

  //SORT
  sortDates() {
    this.unprocessedJobs.sort((a, b) => {
      const dateA = this.stringToDate(a.datum_kraja_radova);
      const dateB = this.stringToDate(b.datum_kraja_radova);
      return dateA.getTime() - dateB.getTime();
    });
  }

  stringToDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
  }

  denyAlertText : string = "Morate uneti obrazlozenje odbijanja poslao!" + '\n' + "Forma se nalazi ispod tabele!"

  //ODBIJ POSAO
  denyJob(id : number){
    if(this.odbijena_komentar == ""){
      alert(this.denyAlertText)
      return
    }
    this.jobService.denyJobByDecorator(this.currentDecorator, id, this.odbijena_komentar).subscribe(
      data => {
        alert(data.text)
        this.ngOnInit()
      }
    )
  }

  //ODOBRI POSAO
  acceptJob(id : number){
    this.jobService.acceptJobByDecorator(this.currentDecorator, id).subscribe(
      data => {
        alert(data.text)
        this.ngOnInit()
      }
    )
  }

  //ZAVRSI POSAO
  finishJob(id : number){
    this.jobService.finishJobByDecorator(id).subscribe(
      data => {
        alert(data.text)
        this.ngOnInit()
      }
    )
  }
}
