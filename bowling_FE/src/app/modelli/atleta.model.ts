export interface Atleta {
    ID_atleta: number;
    Nome: string;
    Cognome: string;
    Data_nascita: Date;
    Stile_gioco: string;
    Braccio_dominante: 'Dx' | 'Sx';
    Sesso: 'M' | 'F';
    ID_utente: number;
    Deleted: 'Y' | 'N';
}