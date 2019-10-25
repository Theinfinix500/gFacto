import { Component, OnInit } from '@angular/core';
import { LigneFacture } from 'src/app/models/LigneFacture';
import { Facture } from 'src/app/models/Facture';
import { AppFactureService } from 'src/app/services/app-facture.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-ajout-facture',
  templateUrl: './ajout-facture.component.html',
  styleUrls: ['./ajout-facture.component.scss']
})
export class AjoutFactureComponent implements OnInit {

  fournisseur: string = '';
  dateFacture: Date = new Date();
  dateCommande: Date = new Date();

  libelle: string = '';
  qte: number = 0;
  puht: number = 0;
  tva: number = 0;
  ttc: number = 0;
  factureId: number = -1;

  lignesFacture: LigneFacture[] = [];

  constructor(private appFactureService: AppFactureService) { }

  ngOnInit() { }

  ajouterLigneFacture() {
    let facture = {} as Facture;
    facture.id = this.factureId;
    facture.fournisseur = this.fournisseur;
    facture.dateCommande = this.dateCommande;
    facture.dateFacture = this.dateFacture;

    let newligneFacture = {} as LigneFacture;
    newligneFacture.libelle = this.libelle;
    newligneFacture.puht = this.puht;
    newligneFacture.qte = this.qte;
    newligneFacture.tva = this.tva;

    this.appFactureService.addFactureLigneFacture(newligneFacture, facture).subscribe(res => {
      this.factureId = res.ligneFacture.idFacture;
      this.lignesFacture = res.lignesFacture;
    });
  }

  onRowEditInit(rowData: LigneFacture) {
  }

  onRowEditSave(rowData: LigneFacture) {
  }

  onRowEditCancel(rowData: LigneFacture, ri) {
  }

  onAdd(table: Table) {
    console.log(table);
    table.value.push({} as LigneFacture);
    table.initRowEdit({} as LigneFacture);
  }

}
