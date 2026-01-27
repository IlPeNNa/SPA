const db = require('../services/db');

const findUsers = async function (connection,reqQuery) {

  let sql = "SELECT * FROM utente";
  const params = [];

  const queryKeys = Object.keys(reqQuery);
  for (let i = 0; i < queryKeys.length; i++) {
    sql+=(i==0)?" WHERE ":" AND ";
    sql += queryKeys[i] + "= ?";
    params.push(reqQuery[queryKeys[i]]);
  }

  const rows = await db.execute(connection,sql,params);

  return (!rows ? [] : rows);

}

const findUserById = async function (connection, ID_utente) {

  const sql = "SELECT * FROM utente WHERE ID_utente = ? ";
  const params = [ID_utente];
  const rows = await db.execute(connection,sql,params);
  
  return (!rows ? [] : rows);
}

const createUtente = async function (connection, utente) {

  const sql = `INSERT INTO utente (ID_utente, Username, Password, Permessi, Deleted)
               VALUES (?, ?, ?, ?, ?)`;
  
  const params = [utente.ID_utente, utente.Username, utente.Password, utente.Permessi, 'N'];
  
  const result = await db.execute(connection, sql, params);
  
  if (result.affectedRows == 0) return null;
  else return utente;
}

const deleteUtente = async function (connection, ID_utente) {
  
  const sql = "UPDATE utente SET Deleted = 'Y' WHERE ID_utente = ?";
  const params = [ID_utente];
  
  const result = await db.execute(connection, sql, params);
  
  return (result.affectedRows > 0);
}

module.exports = {
    findUsers,
    findUserById,
    createUtente,
    deleteUtente
};