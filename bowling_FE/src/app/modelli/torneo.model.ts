export interface Torneo{
    ID_torneo: number;
    Nome_torneo: string;
    Categoria: 'Esordiente' | 'Cadetto' | 'Eccellenza' | 'Professionista';
    Data_inizio: string | Date;
    Data_fine: string | Date;
    Numero_partite: number;
    Montepremi: number; // in euro
    Deleted: 'Y' | 'N';
}