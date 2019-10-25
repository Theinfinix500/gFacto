import { Injectable } from '@angular/core';
import { LigneFacture } from '../models/LigneFacture';
import { of, Observable } from 'rxjs';
import { FactureService } from './facture.service';

@Injectable({
  providedIn: 'root'
})
export class LigneFactureService {

  constructor() { }

  //getone getall add update delete

  getAllLigneFacture(factureId: number): Observable<LigneFacture[]> {
    let lignesFacture: LigneFacture[];
    let ligneFactureByIdFacture: LigneFacture[] = [];
    if(localStorage.getItem('ligneFacture') === null) {
      lignesFacture = [];
    } else {
      lignesFacture = JSON.parse(localStorage.getItem('ligneFacture'));
      
      lignesFacture.forEach(ligneFacture => {
        if(ligneFacture.idFacture === factureId) {
          ligneFactureByIdFacture.push(ligneFacture);
        }
      });
    }
    return of(ligneFactureByIdFacture);
  }

  addLigneFacture(ligneFacture: LigneFacture) {
    if(ligneFacture.idFacture === -1) {
      // generate facture id
    };
    ligneFacture.id = this.generateLigneFactureId();
    let lignesFacture: LigneFacture[] = [];
    if(localStorage.getItem('ligneFacture') === null) {
      lignesFacture.push(ligneFacture);
      localStorage.setItem('ligneFacture',JSON.stringify(lignesFacture));
    } else {
      lignesFacture = JSON.parse(localStorage.getItem('ligneFacture'));
      lignesFacture.push(ligneFacture);
      localStorage.setItem('ligneFacture',JSON.stringify(lignesFacture));
    }
    return of('Added successfully');
  }

  deleteLigneFacture(ligneFactureId: number, factureId: number): Observable<any> {
    let lignesFacture: LigneFacture[] = JSON.parse(localStorage.getItem('ligneFacture'));
    let ligneFactureIndexToRemove: number;

    lignesFacture.forEach( (ligneFacture,index) => {
      if(ligneFacture.id === ligneFactureId && ligneFacture.idFacture === factureId) {
        ligneFactureIndexToRemove = index;
      }
    });

    if(ligneFactureIndexToRemove !== undefined) {
      lignesFacture.splice(ligneFactureIndexToRemove, 1);
      localStorage.setItem('ligneFacture', JSON.stringify(lignesFacture));
      return of('deleted successfully');
    }

    return of('Not found or already deleted');
  }

  updateLigneFacture(ligneFacture: LigneFacture) {
    let lignesFacture: LigneFacture[] = JSON.parse(localStorage.getItem('ligneFacture'));
    lignesFacture.forEach(ligneFactureToUpdate => {
      if(ligneFactureToUpdate.id === ligneFacture.id && ligneFactureToUpdate.idFacture === ligneFacture.idFacture) {
        ligneFactureToUpdate.puht = ligneFacture.puht;
        ligneFactureToUpdate.qte = ligneFacture.qte;
        ligneFactureToUpdate.ttc = ligneFacture.ttc;
        ligneFactureToUpdate.tva = ligneFacture.tva;
        ligneFactureToUpdate.libelle = ligneFacture.libelle;
      }
    });
    localStorage.setItem('ligneFacture',JSON.stringify(lignesFacture));
    return of('Updated Successfully');
  }

  generateLigneFactureId(): number {
    let generatedId: number;
    if(localStorage.getItem('ligneFacture') === null) {
      generatedId = 0;
    } else {
      let lignesFacture: LigneFacture[] = JSON.parse(localStorage.getItem('ligneFacture'));
      generatedId = lignesFacture[lignesFacture.length - 1].id + 1;
    }
    return generatedId;
  }


}
