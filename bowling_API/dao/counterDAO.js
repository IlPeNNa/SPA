const db = require('../services/db');

const nextId = async function (connection, tableName) {

    let sql = "UPDATE counter SET lastId = lastId + 1 WHERE tableName = ?";
    let params = [tableName];

    let rows = await db.execute(connection, sql, params);
    
    let selectSql = "SELECT lastId FROM counter WHERE tableName = ?";

    rows = await db.execute(connection, selectSql, params);

    let id = rows[0].lastId;
    
    return id;
}

module.exports = {
    nextId
};
