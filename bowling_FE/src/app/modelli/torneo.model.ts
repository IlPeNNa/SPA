export interface Torneo{
    ID_torneo: number;
    Nome_torneo: string;
    Categoria: 'Esordiente' | 'Cadetto' | 'Eccellenza' | 'Professionista';
    Data_inizio: Date;
    Data_fine: Date;
    Numero_partite: number;
    Montepremi: number; // in euro
    Deleted: 'Y' | 'N';
}