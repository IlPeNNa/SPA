//Moduli di utilità per eseguire le connessioni

//Importo il modulo standard mysql2/promise per l'accesso al database
//Importo il modulo di config
const mysql = require('mysql2/promise');
const config = require('../config');


//2 metodi dentro questo oggetto: getConnection ed execute

//Connessione al DB chiamando mysql.createConnection passandogli config.db
//Ritorna la connessione a chi chiama questo metodo
async function getConnection() {
  const connection=await mysql.createConnection(config.db);
  return connection;
}

//Passo la connessionem una stringa SQL e dei parametri
// (? sostituiti da un array di parametri)

//Prende la connessione e chiama il metodo execute di mysql2
//Ritorna i risultati della query
async function execute(connection, sql, params) {
  const [results,fields] = await connection.execute(sql, params);
  return results;
}

module.exports = { getConnection, execute }

//Sono 2 chiamate await --> asincrone