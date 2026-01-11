const db = require('../services/db');

const nextId = async function (connection, tableName) {

    sql = "UPDATE counter SET lastId = lastId + 1 WHERE tableName = ?";
    params = [tableName];

    rows = await db.execute(connection, sql, params);
    
    selectSql = "SELECT lastId FROM counter WHERE tableName = ?";

    rows = await db.execute(connection, selectSql, params);

    nextId = rows[0].lastId;
    
    // Per utente, verifica che non superi 1000 (riservati per admin da 1001 in poi)
    if (tableName === 'utente' && nextId >= 1001) {
        throw new Error('Impossibile generare nuovo ID utente: raggiunto limite massimo (1000)');
    }
    
    return nextId;
}

module.exports = {
    nextId
};
