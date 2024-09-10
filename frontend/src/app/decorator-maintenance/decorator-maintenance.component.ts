import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { Maintenance } from '../models/maintenance';

@Component({
  selector: 'app-decorator-maintenance',
  templateUrl: './decorator-maintenance.component.html',
  styleUrls: ['./decorator-maintenance.component.css']
})
export class DecoratorMaintenanceComponent implements OnInit {

  constructor(private jobSerivce : JobService) {}

  ngOnInit(): void {
    this.getAllUnprocessedMaintenance()
  }


  allUnprocessedMaintennace : Maintenance[] = []
  getAllUnprocessedMaintenance(){
    this.jobSerivce.getAllMaintenanceUnprocessed().subscribe(
      data => {
        this,this.allUnprocessedMaintennace = data
      }
    )
  }

  vreme_izrade : string = ""
  datum_izrade : string = ""
  acceptMaintenance(id_posla : number){
    if(this.vreme_izrade == "" || this.datum_izrade == ""){
      alert("Niste uneli datum izrade i/ili vreme izrade!")
      return
    }

    this.jobSerivce.acceptMaintenance(id_posla,this.datum_izrade,this.vreme_izrade).subscribe(
      data => {
        alert(data.text)
        this.ngOnInit()
      }
    )
  }

  denyMaintenance(id_posla : number){
    this.jobSerivce.denyMaintenance(id_posla).subscribe(
      data => {
        alert(data.text)
        this.ngOnInit()
      }
    )
  }

}
