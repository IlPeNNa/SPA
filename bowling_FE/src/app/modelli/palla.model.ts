export interface Palla {
    ID_palla: number;
    ID_atleta: number;
    Marca_palla: string;
    Nome_palla: string;
    Nucleo: 'Simmetrico' | 'Asimmetrico';
    Peso: number; // in libbre
    RG: number;
    Differenziale: number;
    PSA: number | null; // Solo per palle con nucleo Asimmetrico
    Deleted: 'Y' | 'N';
}
