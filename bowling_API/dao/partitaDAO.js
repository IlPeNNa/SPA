const db = require('../services/db');

const getPartiteByTorneo = async function(connection, ID_torneo) {

    const sql = `SELECT ID_partita, ID_atleta_gioca, Punteggio
                 FROM partita
                 WHERE ID_torneo_gioca = ?
                 ORDER BY ID_atleta_gioca, ID_partita`;
    
    const params = [ID_torneo];
    
    const rows = await db.execute(connection, sql, params);
    
    return (!rows ? [] : rows);
}

const getStatisticheAtleta = async function(connection, ID_atleta) {

    const sql = `SELECT 
                    COUNT(*) as Numero_partite,
                    SUM(Punteggio) as Totale_punti,
                    AVG(Punteggio) as Media
                 FROM partita
                 WHERE ID_atleta_gioca = ?`;
    
    const params = [ID_atleta];
    
    const rows = await db.execute(connection, sql, params);
    
    return (!rows || rows.length === 0) ? { Numero_partite: 0, Totale_punti: 0, Media: 0 } : rows[0];
}

module.exports = {
    getPartiteByTorneo,
    getStatisticheAtleta
};
