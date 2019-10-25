import { Component, OnInit } from '@angular/core';
import { Facture } from 'src/app/models/Facture';
import { Router } from '@angular/router';
import { AppFactureService } from 'src/app/services/app-facture.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-liste-facture',
  templateUrl: './liste-facture.component.html',
  styleUrls: ['./liste-facture.component.scss']
})
export class ListeFactureComponent implements OnInit {

  factures: Facture[] = [];

  constructor(private appFactureService: AppFactureService, private router: Router) { }

  ngOnInit() {
    this.appFactureService.getFactures().subscribe(result => {
      this.factures = result;
    });
  }

  redirectTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
