import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Facture } from '../models/Facture';
import { LigneFactureService } from './ligne-facture.service';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private ligneFactureService: LigneFactureService) { }

  // getOne getAll add update delete

  getOneFacture(factureId: number): Observable<Facture> {
    let facture: Facture;
    if (localStorage.getItem('facture') === null) {
      facture = {} as Facture;
    } else {
      let factures: Facture[] = JSON.parse(localStorage.getItem('facture'));
      facture = factures.find(facture => facture.id === factureId);
    }
    return of(facture);
  }

  getAllFacture(): Observable<any> {
    let factures: Facture[];
    let updatedFactures = [];
    let ttc: number;
    if (localStorage.getItem('facture') === null) {
      factures = [];
    } else {
      factures = JSON.parse(localStorage.getItem('facture'));

      factures.forEach(facture => {
        ttc = 0;
        this.ligneFactureService.getAllLigneFacture(facture.id).subscribe(lignesFacture => {
          console.log(lignesFacture);
          lignesFacture.forEach(ligneFacture => {
            console.log(ligneFacture);
            ttc += ligneFacture.ttc;
          });
          let newFacture = {
            id: facture.id,
            fournisseur: facture.fournisseur,
            dateCommande: facture.dateCommande,
            dateFacture: facture.dateFacture,
            ttc: ttc
          };
          updatedFactures.push(newFacture);
        });
      })
    }
    console.log(updatedFactures);
    return of(updatedFactures);
  }

  addFacture(facture: Facture): Observable<any> {
    facture.id = this.generateFactureId();
    let factures: Facture[] = [];
    let addedFacture: Facture = facture;
    if (localStorage.getItem('facture') === null) {
      console.log('null item');
      factures.push(facture);
      localStorage.setItem('facture', JSON.stringify(factures));
    } else {
      console.log('already there');
      factures = JSON.parse(localStorage.getItem('facture'));
      factures.push(facture);
      localStorage.setItem('facture', JSON.stringify(factures));
    }
    return of(addedFacture);
  }

  deleteFacture(factureId: number): Observable<any> {
    let factures: Facture[] = JSON.parse(localStorage.getItem('facture'));
    let factureIndexToRemove: number;

    factures.forEach((facture, index) => {
      if (facture.id === factureId) {
        factureIndexToRemove = index;
      }
    });

    if (factureIndexToRemove !== undefined) {
      factures.splice(factureIndexToRemove, 1);
      localStorage.setItem('facture', JSON.stringify(factures));
      return of('deleted successfully');
    }

    return of('Not found or already deleted');
  }

  updateFacture(facture: Facture): Observable<any> {
    let factures: Facture[] = JSON.parse(localStorage.getItem('facture'));
    factures.forEach(factureToUpdate => {
      if (factureToUpdate.id === facture.id) {
        factureToUpdate.fournisseur = facture.fournisseur;
        factureToUpdate.dateFacture = facture.dateFacture;
        factureToUpdate.dateCommande = facture.dateCommande;
      }
    });
    localStorage.setItem('facture', JSON.stringify(factures));
    return of('Updated successfully');
  }

  generateFactureId(): number {
    let generateId: number;
    if (localStorage.getItem('facture') === null) {
      generateId = 0;
    } else {
      let factures: Facture[] = JSON.parse(localStorage.getItem('facture'));
      generateId = factures[factures.length - 1].id + 1;
    }
    return generateId;
  }

}
