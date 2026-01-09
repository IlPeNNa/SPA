const express = require('express');
const db = require('../services/db');
const pallaDAO = require('../dao/pallaDAO');

const router = express.Router();

// GET /palle?ID_atleta=123 - Recupera le palle di un atleta
router.get('/palle', async (req, res) => {
    let connection;
    try {
        const ID_atleta = req.query.ID_atleta;
        if (!ID_atleta) {
            return res.status(400).json({ error: 'ID_atleta è richiesto' });
        }
        connection = await db.getConnection();
        const palle = await pallaDAO.getPalleByAtleta(connection, ID_atleta);
        res.status(200).json(palle);
    } catch (error) {
        console.error('Errore nel recupero delle palle:', error);
        res.status(500).json({ error: 'Errore nel recupero delle palle' });
    } finally {
        await connection.close();
    }
});

// POST /palle - Inserisce una nuova palla
router.post('/palle', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const nuovaPalla = await pallaDAO.insertPalla(connection, req.body);
        if (nuovaPalla) {
            res.status(201).json(nuovaPalla);
        } else {
            res.status(400).json({ error: 'Errore nell\'inserimento della palla' });
        }
    } catch (error) {
        console.error('Errore nell\'inserimento della palla:', error);
        res.status(500).json({ error: 'Errore nell\'inserimento della palla' });
    } finally {
        await connection.close();
    }
});

// PUT /palle/:ID_palla - Modifica una palla esistente
router.put('/palle/:ID_palla', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const pallaDaModificare = { ...req.body, ID_palla: req.params.ID_palla };
        const success = await pallaDAO.updatePalla(connection, pallaDaModificare);
        if (success) {
            res.status(200).json({ message: 'Palla modificata con successo' });
        } else {
            res.status(404).json({ error: 'Palla non trovata' });
        }
    } catch (error) {
        console.error('Errore nella modifica della palla:', error);
        res.status(500).json({ error: 'Errore nella modifica della palla' });
    } finally {
        await connection.close();
    }
});

// DELETE /palle/:ID_palla - Cancella una palla (soft delete)
router.delete('/palle/:ID_palla', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const success = await pallaDAO.deletePalla(connection, req.params.ID_palla);
        if (success) {
            res.status(200).json({ message: 'Palla cancellata con successo' });
        } else {
            res.status(404).json({ error: 'Palla non trovata' });
        }
    } catch (error) {
        console.error('Errore nella cancellazione della palla:', error);
        res.status(500).json({ error: 'Errore nella cancellazione della palla' });
    } finally {
        await connection.close();
    }
});

module.exports = router;