export interface Utente {
    ID_utente: number;
    Username: string;
    Password: string;
    Permessi: 'Admin' | 'Atleta' | 'Guest';
    Deleted: 'Y' | 'N';
}