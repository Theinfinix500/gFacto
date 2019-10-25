import { Facture } from './Facture';

export interface LigneFacture {
    id: number;
    libelle: string;
    qte: number;
    puht: number;
    tva: number;
    ttc: number;
    idFacture: number
}