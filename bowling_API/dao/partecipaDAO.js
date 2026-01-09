const db = require('../services/db');

const getAtletiByTorneo = async function(connection, ID_torneo) {

    const sql = `SELECT a.ID_atleta, a.Nome, a.Cognome
                 FROM atleta a
                 INNER JOIN partecipa p ON a.ID_atleta = p.ID_atleta_partecipa
                 WHERE p.ID_torneo_partecipa = ? AND a.Deleted = 'N'
                 ORDER BY a.Cognome, a.Nome`;
    
    const params = [ID_torneo];
    
    const rows = await db.execute(connection, sql, params);
    
    return (!rows ? [] : rows);
}

module.exports = {
    getAtletiByTorneo
};
