import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../models/job';
import { Message } from '../models/message';
import { Maintenance } from '../models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http : HttpClient) { }

  backUrl : string = "http://localhost:4000/job"

  addJob(posao : Job){
    const data = {
      posao : posao
    }
    return this.http.post<Message>(`${this.backUrl}/addJob`, data);
  }

  //FALI ID
  addCommentAndRatingForJob(komentar : string, ocena : number){
    const data = {
      komentar : komentar,
      ocena : ocena
    }
    return this.http.post<Message>(`${this.backUrl}/addCommentAndRatingForJob`, data);
  }

  bookMaintenance(posao : Job){
    const data = {
      posao : posao
    }
    return this.http.post<Message>(`${this.backUrl}/bookMaintenance`, data);
  }

  getAllJobs(){
    return this.http.get<Job[]>(`${this.backUrl}/getAllJobs`)
  }

  getAllMyJobs(vlasnik : string){
    const data = {
      vlasnik : vlasnik
    }
    return this.http.post<Job[]>(`${this.backUrl}/getAllMyJobs`, data)
  }

  getAllMyJobsAsDecorator(dekorater : string){
    const data = {
      dekorater : dekorater
    }
    return this.http.post<Job[]>(`${this.backUrl}/getAllMyJobsAsDecorator`, data)
  }

  getAllUnprocessedJobs(){
    return this.http.get<Job[]>(`${this.backUrl}/getAllUnprocessedJobs`)
  }

  acceptJobByDecorator(dekorater : string, id : number){
    const data = {
      dekorater : dekorater,
      id : id
    }
    return this.http.post<Message>(`${this.backUrl}/acceptJobByDecorator`, data)
  }

  denyJobByDecorator(dekorater : string, id : number, komentar : string){
    const data = {
      dekorater : dekorater,
      id : id,
      komentar : komentar
    }
    return this.http.post<Message>(`${this.backUrl}/denyJobByDecorator`, data)
  }

  finishJobByDecorator(id : number){
    const data = {
      id : id
    }
    return this.http.post<Message>(`${this.backUrl}/finishJobByDecorator`, data)
  }

  //MAINTENNACE
  createMaintenance(maintenance : Maintenance){
    const data = {
      maintenance : maintenance
    }
    return this.http.post<Message>(`${this.backUrl}/createMaintenance`, data)
  }

  getAllMaintenanceUnprocessed(){
    return this.http.get<Maintenance[]>(`${this.backUrl}/getAllMaintenanceUnprocessed`)
  }

  getAllMaintenanceAccepted(){
    return this.http.get<Maintenance[]>(`${this.backUrl}/getAllMaintenanceAccepted`)
  }

  acceptMaintenance(id_posla : number, datum_izrade : string, vreme_izrade : string){
    const data = {
      id_posla : id_posla,
      datum_izrade : datum_izrade,
      vreme_izrade : vreme_izrade
    }
    return this.http.post<Message>(`${this.backUrl}/acceptMaintenance`, data)
  }

  denyMaintenance(id_posla : number){
    const data = {
      id_posla : id_posla
    }
    return this.http.post<Message>(`${this.backUrl}/denyMaintenance`, data)
  }

}
