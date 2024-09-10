import { Usluga } from "./usluga";

export class Job {

  id : number = 0;
  vlasnik : string = "";
  firma : string = "";
  dekorater : string = "";
  komentar : string = "";
  ocena : number = 0;
  kvadratura_baste : number = 0;
  kvadratura_plava : number = 0;
  kvadratura_zelena : number = 0;
  kvadratura_braon : number = 0;
  broj_stolova : number = 0;
  broj_stolica : number = 0;
  tip_baste : string = "";
  dodatni_zahtevi : string = "";
  lista_usluga : Array<Usluga> = [];
  status : string = "";
  datum_kraja_radova : string = "";
  broj_bazena : number = 0;
  broj_fontana : number = 0;

}
