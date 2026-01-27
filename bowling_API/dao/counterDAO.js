const db = require('../services/db');

const nextId = async function (connection, tableName) {

    const sql = "UPDATE counter SET lastId = lastId + 1 WHERE tableName = ?";
    const params = [tableName];

    let rows = await db.execute(connection, sql, params);
    
    const selectSql = "SELECT lastId FROM counter WHERE tableName = ?";

    rows = await db.execute(connection, selectSql, params);

    const id = rows[0].lastId;
    
    return id;
}

module.exports = {
    nextId
};
