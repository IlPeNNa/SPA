const express = require('express');
const db = require('../services/db');
const atletaDAO = require('../dao/atletaDAO');
const partitaDAO = require('../dao/partitaDAO');

const router = express.Router();

// GET /atleti - Recupera tutti gli atleti
router.get('/atleti', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const atleti = await atletaDAO.getAllAtleti(connection);
        res.status(200).json(atleti);
    } catch (error) {
        console.error('Errore nel recupero degli atleti:', error);
        res.status(500).json({ error: 'Errore nel recupero degli atleti' });
    } finally {
        await connection.close();
    }
});

// GET /atleti/:ID_atleta - Recupera un atleta specifico con statistiche
router.get('/atleti/:ID_atleta', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const atleta = await atletaDAO.getAtletaById(connection, req.params.ID_atleta);
        if (atleta.length === 0) {
            res.status(404).json({ error: 'Atleta non trovato' });
        } else {
            // Recupera le statistiche dell'atleta
            const statistiche = await partitaDAO.getStatisticheAtleta(connection, req.params.ID_atleta);
            
            // Combina i dati dell'atleta con le statistiche (esclusi gli ID)
            const atletaCompleto = {
                Nome: atleta[0].Nome,
                Cognome: atleta[0].Cognome,
                Data_nascita: atleta[0].Data_nascita,
                Stile_gioco: atleta[0].Stile_gioco,
                Braccio_dominante: atleta[0].Braccio_dominante,
                Sesso: atleta[0].Sesso,
                Numero_partite: statistiche.Numero_partite || 0,
                Totale_punti: statistiche.Totale_punti || 0,
                Media: statistiche.Media ? parseFloat(statistiche.Media.toFixed(2)) : 0
            };
            
            res.status(200).json(atletaCompleto);
        }
    } catch (error) {
        console.error('Errore nel recupero dell\'atleta:', error);
        res.status(500).json({ error: 'Errore nel recupero dell\'atleta' });
    } finally {
        await connection.close();
    }
});

// POST /atleti - Crea un nuovo atleta
router.post('/atleti', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const nuovoAtleta = await atletaDAO.createAtleta(connection, req.body);
        if (nuovoAtleta) {
            res.status(201).json(nuovoAtleta);
        } else {
            res.status(400).json({ error: 'Errore nella creazione dell\'atleta' });
        }
    } catch (error) {
        console.error('Errore nella creazione dell\'atleta:', error);
        res.status(500).json({ error: 'Errore nella creazione dell\'atleta' });
    } finally {
        await connection.close();
    }
});

// PUT /atleti/:ID_atleta - Modifica un atleta esistente
router.put('/atleti/:ID_atleta', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const atletaDaModificare = { ...req.body, ID_atleta: req.params.ID_atleta };
        const success = await atletaDAO.updateAtleta(connection, atletaDaModificare);
        if (success) {
            res.status(200).json({ message: 'Atleta modificato con successo' });
        } else {
            res.status(404).json({ error: 'Atleta non trovato' });
        }
    } catch (error) {
        console.error('Errore nella modifica dell\'atleta:', error);
        res.status(500).json({ error: 'Errore nella modifica dell\'atleta' });
    } finally {
        await connection.close();
    }
});

// DELETE /atleti/:ID_atleta - Cancella un atleta (soft delete)
router.delete('/atleti/:ID_atleta', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const success = await atletaDAO.deleteAtleta(connection, req.params.ID_atleta);
        if (success) {
            res.status(200).json({ message: 'Atleta cancellato con successo' });
        } else {
            res.status(404).json({ error: 'Atleta non trovato' });
        }
    } catch (error) {
        console.error('Errore nella cancellazione dell\'atleta:', error);
        res.status(500).json({ error: 'Errore nella cancellazione dell\'atleta' });
    } finally {
        await connection.close();
    }
});

module.exports = router;