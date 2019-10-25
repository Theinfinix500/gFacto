import { Injectable } from '@angular/core';
import { Facture } from '../models/Facture';
import { of, Observable } from 'rxjs';
import { LigneFacture } from '../models/LigneFacture';

@Injectable({
  providedIn: 'root'
})
export class AppFactureService {

  constructor() { }

  //add facture
  //add ligne facture
  //get ligne facture by facture id

  addFacture(facture: Facture): Observable<Facture> {
    //generate id for facture
    //Check if its the first insert of a facture (localStorage)
    //if its the first time then initialise an item with name facture
    //if theres an item with name facture then insert facture within it
    //return the added facture 
    let factures: Facture[] = [];
    if (localStorage.getItem('facture') === null) {
      facture.id = 0;
      factures.push(facture);
      localStorage.setItem('facture', JSON.stringify(factures));
    } else {
      factures = JSON.parse(localStorage.getItem('facture'));
      facture.id = factures[factures.length - 1].id + 1;
      factures.push(facture);
      localStorage.setItem('facture', JSON.stringify(factures));
    }
    return of(facture);
  }

  addFactureLigneFacture(ligneFacture: LigneFacture, facture: Facture): Observable<any> {
    //check if its the first click ever by evaluating the value of factureId 
    //if its -1 that means its the first insert of ligne facture ever, So
    //it needs to generate a new facture then its gonna use its generated id to
    //add that ligne facture
    let lignesFacture: LigneFacture[] = [];
    if (facture.id === -1) {
      this.addFacture(facture).subscribe(res => {
        ligneFacture.idFacture = res.id;
        lignesFacture = this.addLigneFacture(ligneFacture);
      });
    } else {
      ligneFacture.idFacture = facture.id;
      lignesFacture = this.addLigneFacture(ligneFacture);
    }
    return of({ lignesFacture: lignesFacture, ligneFacture: ligneFacture });
  }

  addLigneFacture(ligneFacture: LigneFacture) {
    //generate id for ligne facture
    //Check if its the first insert of a ligne facture (localStorage)
    //if its the first time then initialise an item with name ligneFacture
    //if theres an item with name ligneFacture then insert ligne facture within it
    //return the added ligne facture
    let lignesFacture: LigneFacture[] = [];
    ligneFacture.ttc = (ligneFacture.puht * ligneFacture.qte) + (ligneFacture.puht * ligneFacture.qte * (ligneFacture.tva / 100));
    if (localStorage.getItem('ligneFacture') === null) {
      ligneFacture.id = 0;
      lignesFacture.push(ligneFacture);
      localStorage.setItem('ligneFacture', JSON.stringify(lignesFacture));
    } else {
      lignesFacture = JSON.parse(localStorage.getItem('ligneFacture'));
      ligneFacture.id = lignesFacture[lignesFacture.length - 1].id + 1;
      lignesFacture.push(ligneFacture);
      localStorage.setItem('ligneFacture', JSON.stringify(lignesFacture));
    }

    //fill another array with the lignes facture that have the same facture id and return it
    let filteredLignesFacture: LigneFacture[] = [];
    lignesFacture.forEach(lF => {
      if (lF.idFacture === ligneFacture.idFacture) {
        filteredLignesFacture.push(lF);
      }
    });
    return filteredLignesFacture;
  }

  getFactures(): Observable<Facture[]> {
    //get all factures and for each one get the ligne facture calculate the total ttc and add it to the facture object or clone it
    let factures: Facture[];
    let lignesFacture: LigneFacture[];
    let ttc: number;
    let updatedFactures = [];
    if (localStorage.getItem('facture') === null) {
      factures = [];
    } else {
      factures = JSON.parse(localStorage.getItem('facture'));
      factures.forEach(facture => {
        ttc = 0;
        lignesFacture = this.getLignesFactureByFacture(facture.id);
        lignesFacture.forEach(ligneFacture => {
          ttc += ligneFacture.ttc;
        });
        facture = { ...facture, ...{ ttc: ttc } };
        updatedFactures.push(facture);
      });
    }
    return of(updatedFactures);
  }

  getLignesFactureByFacture(factureId: number) {
    let lignesFacture: LigneFacture[];
    let filteredLignesFacture: LigneFacture[] = [];
    if (localStorage.getItem('ligneFacture') === null) {
      lignesFacture = [];
    } else {
      lignesFacture = JSON.parse(localStorage.getItem('ligneFacture'));
      lignesFacture.forEach(ligneFacture => {
        if (ligneFacture.idFacture === factureId) {
          filteredLignesFacture.push(ligneFacture);
        }
      });
    }
    return filteredLignesFacture;
  }

}
