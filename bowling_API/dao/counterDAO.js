const db = require('../services/db');

const nextId = async function (connection, tableName) {

    sql = "UPDATE counter SET lastId = lastId + 1 WHERE tableName = ?";
    params = [tableName];

    rows = await db.execute(connection, sql, params);
    
    selectSql = "SELECT lastId FROM counter WHERE tableName = ?";

    rows = await db.execute(connection, selectSql, params);

    nextId = rows[0].lastId;
    
    return nextId;
}

module.exports = {
    nextId
};
