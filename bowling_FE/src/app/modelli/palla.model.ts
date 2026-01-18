export interface Palla {
    ID_palla: number;
    ID_atente: number;
    Marca_palla: string;
    Nome_palla: string;
    Nucleo: 'Simmetrtico' | 'Asimmetrico';
    Peso: number; // in libbre
    RG: number;
    Diff: number;
    PSA: number;
    Deleted: 'Y' | 'N';
}
