const db = require('../services/db');

const findUsers = async function (connection,reqQuery) {

  sql = "SELECT * FROM utente";
  params=[];

  queryKeys = Object.keys(reqQuery);
  for (i = 0; i < queryKeys.length; i++) {
    sql+=(i==0)?" WHERE ":" AND ";
    sql += queryKeys[i] + "= ?";
    params.push(reqQuery[queryKeys[i]]);
  }

  const rows = await db.execute(connection,sql,params);

  return (!rows ? [] : rows);

}

const findUserById = async function (connection, ID_utente) {

  sql = "SELECT * FROM utente WHERE ID_utente = ? ";
  params=[ID_utente];
  const rows = await db.execute(connection,sql,params);
  
  return (!rows ? [] : rows);
}

module.exports = {
    findUsers,
    findUserById
};