const db = require('../services/db');

//Moduli da mettere a posto in seguito

const insertPalla = async function(connection, palla) {

    const sql = `INSERT INTO palla
                    (ID_palla, ID_atleta, Marca_palla, Nome_palla, Nucleo, Peso, RG, Differenziale, Deleted)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
        const params = [palla.ID_palla, palla.ID_atleta, palla.Marca_palla, palla.Nome_palla,
            palla.Nucleo, palla.Peso, palla.RG, palla.Differenziale, "N"];
    
        const result = await db.execute(connection, sql, params);
    
        if (result.affectedRows == 0) return null;
        else return palla;

}

const updatePalla = async function(connection, palla) {
    
    const sql = `UPDATE palla SET Marca_palla = ?, Nome_palla = ?, Nucleo = ?, Peso = ?, RG = ?, Differenziale = ?
                    WHERE ID_palla = ?`;
    
        const params = [palla.Marca_palla, palla.Nome_palla, palla.Nucleo, palla.Peso, palla.RG, palla.Differenziale, palla.ID_palla];
    
        const result = await db.execute(connection, sql, params);
    
        return (result.affectedRows > 0);
}  

const deletePalla = async function(connection, ID_palla) {

    const sql = "UPDATE palla SET Deleted= 'Y' WHERE ID_palla = ?";
    const params = [ID_palla];
    
    const result = await db.execute(connection, sql, params);
    
    return (result.affectedRows > 0);
}

module.exports = {
    insertPalla,
    updatePalla,
    deletePalla
};
