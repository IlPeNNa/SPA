const db = require('../services/db');

const createTorneo = async function (connection, torneo) {

    const sql = `INSERT INTO torneo
                (ID_torneo, Nome_torneo, Categoria, Data_inizio, Data_fine,
                Numero_partite, Montepremi, Deleted)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [torneo.ID_torneo, torneo.Nome_torneo, torneo.Categoria, 
        torneo.Data_inizio, torneo.Data_fine, torneo.Numero_partite, 
        torneo.Montepremi, "N"];

    const result = await db.execute(connection, sql, params);

    if (result.affectedRows == 0) return null;
    else return torneo;
}

const updateTorneo = async function (connection, torneo) {

    const sql = `UPDATE torneo SET Nome_torneo = ?, Categoria = ?, Data_inizio = ?, Data_fine = ?,
                Numero_partite = ?, Montepremi = ?
                WHERE ID_torneo = ?`;

    const params = [torneo.Nome_torneo, torneo.Categoria, torneo.Data_inizio, torneo.Data_fine,
        torneo.Numero_partite, torneo.Montepremi, torneo.ID_torneo];

    const result = await db.execute(connection, sql, params);

    return (result.affectedRows > 0);
}

const deleteTorneo = async function (connection, ID_torneo) {
    
    const sql = "UPDATE torneo SET Deleted= 'Y' WHERE ID_torneo = ?";
    const params = [ID_torneo];

    const result = await db.execute(connection, sql, params);

    return (result.affectedRows > 0);
}

const getAllTornei = async function (connection) {
    
    const sql = "SELECT * FROM torneo WHERE Deleted = 'N'";
    const params = [];

    const rows = await db.execute(connection, sql, params);

    return (!rows ? [] : rows);
}

const getTorneoById = async function (connection, ID_torneo) {

    const sql = "SELECT * FROM torneo WHERE ID_torneo = ? AND Deleted = 'N'";
    const params = [ID_torneo];
    const rows = await db.execute(connection, sql, params);

    return (!rows ? [] : rows);
}

module.exports = {
    createTorneo,
    updateTorneo,
    deleteTorneo,
    getAllTornei,
    getTorneoById
};