export class Evenement {
    titre!: string;
    startDate!: Date;
    endDate!: Date;
    location!: string;
    description!: string;
    calendrier!: string;
    
    constructor(_titre: string, _startDate: Date, _endDate: Date, _location: string, _description: string, _calendrier: string) {
        this.titre = _titre;
        this.startDate = _startDate;
        this.endDate = _endDate;
        this.location = _location;
        this.description = _description;
        this.calendrier = _calendrier;
    }


    toString(): string {
        return 'Titre: ' + this.titre + '\n' +
        'Début: ' + this.startDate + '\n' +
        'Fin: ' + this.endDate + '\n' +
        'Lieu: ' + this.location + '\n' +
        'Description: ' + this.description + '\n' +
        'Calendrier: ' + this.calendrier + '\n';
    }
    
}

export class Calendrier {
    evenements!: Evenement[];
    nom!: string;
    couleur!: string;

    constructor(_evenements: Evenement[], _nom: string, _couleur: string) {
        this.evenements = _evenements;
        this.nom = _nom;
        this.couleur = _couleur;
    }
}