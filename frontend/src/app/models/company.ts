import { Usluga } from "./usluga";

export class Company {
  naziv : string = "";
  adresa : string = "";
  lista_zaposlenih : Array<string> = [];
  ocene : Array<number> = [];
  lista_usluga : Array<Usluga> = [];
  lista_komentara : Array<string> = [];
  pocetak_godisnjeg_odmora : string = "";
  kraj_godisnjeg_odmora : string = "";
  kontakt_telefon : string = "";
  radno_vreme : Array<string> = [];
}
