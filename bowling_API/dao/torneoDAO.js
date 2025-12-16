const db = require('../services/db');

//Moduli da mettere a posto in seguito

const createTorneo = async function(connection, torneo) {

}

const updateTorneo = async function(connection, torneo) {

}  

//Cancellazione logica con Deleted = 'Y'
const deleteTorneo = async function(connection, ID_torneo) {

}

//Moduli per filtrare i tornei in base a vari parametri da sviluppare poi (data, montepremi)

module.exports = {
    createTorneo,
    updateTorneo,
    deleteTorneo
};