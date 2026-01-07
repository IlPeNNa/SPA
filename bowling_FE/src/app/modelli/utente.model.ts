export interface Utente {
    ID_utente: number;
    Username: string;
    Password: string;
    Permessi: 'admin' | 'atleta' | 'guest';
    Deleted: 'Y' | 'N';
}