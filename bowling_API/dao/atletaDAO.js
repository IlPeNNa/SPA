//Importo l'oggetto DB su cui posso chiamare getConnection ed execute
const db = require('../services/db');

//getQuery è un oggetto con coppie nome-valore che sono tutti i parametri
// che voglio inserire come filtri nella mia query

//Esempio di reqQuery:
// {
//     "nome": "Mario",
//     "cognome": "Rossi"
// }
const findAtleta = async function (connection, reqQuery) {
    
    sql = "SELECT * FROM atleta";
    params=[];

    //La requestQuery la uso per tutti i filtri e la clausola WHERE
    //Object.keys(getQuery) mi ritorna un array con tutte le proprietà di reqQuery, ovvero con tutti i nomi dei campi da filtrare
    queryKeys = Object.keys(reqQuery);
    for (i = 0; i < queryKeys.length; i++) {
    sql+=(i==0)?" WHERE ":" AND "; //Al primo ciclo aggiungo WHERE, dopo AND
    sql += queryKeys[i] + "= ?"; //Aggiungo il filtro
    params.push(reqQuery[queryKeys[i]]);
    }

    //Ottengo un resultset da questa execute che contiene tutte le righe del mio resultset
    const rows = await db.execute(connection,sql,params);

    //Controllo se ho righe nel resultset, perchè può essere vuoto se non trovo niente
    //Sintassi: condizione (rows negato) ? cosa_fa_se_true (restituisce array vuoto) : cosa_fa_se_false (restituisce le righe trovate)
    return (!rows ? [] : rows);
}

//Uso questo modello per le prossime DAO, questa è solo un esempio
const findAtletaById = async function (connection, ID_atleta) {

    //Molto meglio fare le query così invece di concatenare le stringhe
    const sql = "SELECT * FROM atleta WHERE ID_atleta = ?";
    const params = [ID_atleta];
    const rows = await db.execute(connection, sql, params);

    return (!rows ? [] : rows);
}


/*--------------------------------------------------------------------
Da qui inizio con i moduli che esporto effettivamente
--------------------------------------------------------------------*/

const createAtleta = async function (connection, atleta) {

    const sql = `INSERT INTO atleta
                (ID_atleta, Nome, Cognome, Data_nascita, Stile_gioco,
                Braccio_dominante, Sesso, ID_utente, Deleted)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    params = [atleta.ID_atleta, atleta.Nome, atleta.Cognome, 
        atleta.Data_nascita, atleta.Stile_gioco, atleta.Braccio_dominante, 
        atleta.Sesso,atleta.ID_utente, "N"];

    const result = await db.execute(connection, sql, params);

    if (result.affectedRows == 0) return null;
    else return atleta;
}

const updateAtleta = async function (connection, atleta) {

    const sql = `UPDATE atleta SET Nome = ?, Cognome = ?, Data_nascita = ?, Stile_gioco = ?,
                Braccio_dominante = ?, Sesso = ?, ID_utente = ?
                WHERE ID_atleta = ?`;

    const params = [atleta.Nome, atleta.Cognome, atleta.Data_nascita, atleta.Stile_gioco,
        atleta.Braccio_dominante, atleta.Sesso, atleta.ID_utente, atleta.ID_atleta];

    const result = await db.execute(connection, sql, params);

    return (result.affectedRows > 0);
}

const deleteAtleta = async function (connection, ID_atleta) {
    
  const sql = "UPDATE atleta SET Deleted= 'Y' WHERE ID_atleta = ?";
  const params = [ID_atleta];

  const result = await db.execute(connection, sql, params);

  return (result.affectedRows > 0);
}

const getAllAtleti = async function (connection, filtri = {}) {
    
  let sql = "SELECT * FROM atleta WHERE Deleted = 'N'";
  const params = [];

  // Filtra per ID_utente se fornito
  if (filtri.ID_utente) {
    sql += " AND ID_utente = ?";
    params.push(parseInt(filtri.ID_utente));
  }

  const rows = await db.execute(connection, sql, params);

  return (!rows ? [] : rows);
}

const getAtletaById = async function (connection, ID_atleta) {

  const sql = "SELECT * FROM atleta WHERE ID_atleta = ? AND Deleted = 'N'";
  const params = [ID_atleta];

  const rows = await db.execute(connection, sql, params);
  
  return (!rows ? [] : rows);
}

module.exports = {
    createAtleta,
    updateAtleta,
    deleteAtleta,
    getAllAtleti,
    getAtletaById
};