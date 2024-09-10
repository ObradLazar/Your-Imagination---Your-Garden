import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  backUrl : string = "http://localhost:4000/user"

  login(korisnicko_ime : string, lozinka : string){
    const data = {
      korisnicko_ime : korisnicko_ime,
      lozinka : lozinka
    }

    return this.http.post<User>(`${this.backUrl}/login`, data);
  }

  getAllDecorators(){
    return this.http.get<User[]>(`${this.backUrl}/getAllDecorators`);
  }

  getAllOwners(){
    return this.http.get<User[]>(`${this.backUrl}/getAllOwners`);
  }

  getAllUnregistered(){
    return this.http.get<User[]>(`${this.backUrl}/getAllUnregistered`);
  }

  getByMail(mejl : string){
    const data = {
      mejl : mejl
    }
    return this.http.post<User>(`${this.backUrl}/getByMail`, data)
  }

  getByUsername(korisnicko_ime : string){
    const data = {
      korisnicko_ime : korisnicko_ime
    }
    return this.http.post<User>(`${this.backUrl}/getByUsername`, data)
  }

  addUser(korisnik : User){
    const data = {
      korisnik : korisnik
    }
    return this.http.post<Message>(`${this.backUrl}/addUser`, data)
  }

  acceptUser(korisnicko_ime : string){
    const data = {
      korisnicko_ime : korisnicko_ime
    }
    return this.http.post<Message>(`${this.backUrl}/acceptUser`, data)
  }

  denyUser(korisnicko_ime : string){
    const data = {
      korisnicko_ime : korisnicko_ime
    }
    return this.http.post<Message>(`${this.backUrl}/denyUser`, data)
  }


  //-----CHANGE-----

  changePassword(korisnicko_ime : string, lozinka : string){
    const data = {
      korisnicko_ime : korisnicko_ime,
      lozinka : lozinka
    }
    return this.http.post<Message>(`${this.backUrl}/changePassword`, data)
  }

  changeMail(korisnicko_ime : string, mejl : string){
    const data = {
      korisnicko_ime : korisnicko_ime,
      mejl : mejl
    }
    return this.http.post<Message>(`${this.backUrl}/changeMail`, data)
  }

  changeCardNumber(korisnicko_ime : string, broj_kreditne_kartice : string){
    const data = {
      korisnicko_ime : korisnicko_ime,
      broj_kreditne_kartice : broj_kreditne_kartice
    }
    return this.http.post<Message>(`${this.backUrl}/changeCardNumber`, data)
  }

  changeFirstname(korisnicko_ime : string, ime : string){
    const data = {
      korisnicko_ime : korisnicko_ime,
      ime : ime
    }
    return this.http.post<Message>(`${this.backUrl}/changeFirstname`, data)
  }

  changeLastname(korisnicko_ime : string, prezime : string){
    const data = {
      korisnicko_ime : korisnicko_ime,
      prezime : prezime
    }
    return this.http.post<Message>(`${this.backUrl}/changeLastname`, data)
  }

  changeAdress(korisnicko_ime : string, adresa : string){
    const data = {
      korisnicko_ime : korisnicko_ime,
      adresa : adresa
    }
    return this.http.post<Message>(`${this.backUrl}/changeAdress`, data)
  }

  changePhoneNumber(korisnicko_ime : string, broj_telefona : string){
    const data = {
      korisnicko_ime : korisnicko_ime,
      broj_telefona : broj_telefona
    }
    return this.http.post<Message>(`${this.backUrl}/changePhoneNumber`, data)
  }

  changeImage(korisnicko_ime : string, slika : File){
    const formsData = new FormData();
    formsData.append("korisnicko_ime", korisnicko_ime)
    formsData.append("slika", slika)

    return this.http.post<Message>(`${this.backUrl}/changeImage`, formsData)
  }


}
