import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http : HttpClient) { }

  backUrl : string = "http://localhost:4000/company"

  getAllCompanies(){
    return this.http.get<Company[]>(`${this.backUrl}/getAllCompanies`)
  }

  searchCompanies(seachParam : string){
    const data = {
      seachParam : seachParam
    }
    return this.http.post<Company[]>(`${this.backUrl}/searchCompanies`, data)
  }

  getCompanyByName(naziv : string){
    const data = {
      naziv : naziv
    }
    return this.http.post<Company>(`${this.backUrl}/getCompanyByName`, data)
  }

  addCompany(nova_firma : Company){
    const data = {
      nova_firma : nova_firma
    }
    return this.http.post<Message>(`${this.backUrl}/addCompany`, data)
  }

}
