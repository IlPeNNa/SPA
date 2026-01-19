const express = require('express');
const db = require('../services/db');
const atletaDAO = require('../dao/atletaDAO');
const partitaDAO = require('../dao/partitaDAO');
const counterDAO = require('../dao/counterDAO');

const router = express.Router();

// GET /atleti - Recupera tutti gli atleti
router.get('/atleti', async function(req, res) {
    conn=await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        const atleti = await atletaDAO.getAllAtleti(conn, req.query);
        
        // Se filtrato per ID_utente, aggiungi statistiche
        if (req.query.ID_utente && atleti.length > 0) {
            const atleta = atleti[0];
            const statistiche = await partitaDAO.getStatisticheAtleta(conn, atleta.ID_atleta);
            
            const atletaCompleto = {
                ...atleta,
                Numero_partite: statistiche.Numero_partite || 0,
                Totale_punti: statistiche.Totale_punti || 0,
                Media: statistiche.Media != null ? parseFloat(Number(statistiche.Media).toFixed(2)) : 0
            };
            
            res.json([atletaCompleto]);
        } else {
            res.json(atleti);
        }
        
        await conn.commit();
    } catch (error) {
        console.error(`routes/utenti.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({erroreMsg: error.message});
    } finally {
        await conn.close();
    }
});

// GET /atleti/:ID_atleta - Recupera un atleta specifico con statistiche
router.get('/atleti/:ID_atleta', async function(req, res) {
    conn = await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        const atleta = await atletaDAO.getAtletaById(conn, req.params.ID_atleta);
        if (atleta.length === 0) {
            await conn.rollback();
            res.status(404);
            return res.json({ erroreMsg: 'Atleta non trovato' });
        }
        // Recupera le statistiche dell'atleta
        const statistiche = await partitaDAO.getStatisticheAtleta(conn, req.params.ID_atleta);
        
        // Combina i dati dell'atleta con le statistiche
        const atletaCompleto = {
            ID_atleta: atleta[0].ID_atleta,
            Nome: atleta[0].Nome,
            Cognome: atleta[0].Cognome,
            Data_nascita: atleta[0].Data_nascita,
            Stile_gioco: atleta[0].Stile_gioco,
            Braccio_dominante: atleta[0].Braccio_dominante,
            Sesso: atleta[0].Sesso,
            ID_utente: atleta[0].ID_utente,
            Numero_partite: statistiche.Numero_partite || 0,
            Totale_punti: statistiche.Totale_punti || 0,
            Media: statistiche.Media != null ? parseFloat(Number(statistiche.Media).toFixed(2)) : 0
        };
        
        res.json(atletaCompleto);
        await conn.commit();
    } catch (error) {
        console.error(`routes/atleta.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({ erroreMsg: error.message });
    } finally {
        await conn.close();
    }
});

// POST /atleti - Crea un nuovo atleta
router.post('/atleti', async function(req, res) {
    conn = await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        atleta = req.body;
        nextId = await counterDAO.nextId(conn, 'atleta');
        atleta.ID_atleta = nextId;
        nuovoAtleta = await atletaDAO.createAtleta(conn, atleta);
        if (nuovoAtleta != null) {
            res.status(201);
            res.json(nuovoAtleta);
        } else {
            res.status(500);
        }
        await conn.commit();
    } catch (error) {
        console.error(`routes/atleta.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({ erroreMsg: error.message });
    } finally {
        await conn.close();
    }
});

// PUT /atleti/:ID_atleta - Modifica un atleta esistente
router.put('/atleti/:ID_atleta', async function(req, res) {
    conn = await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        const atletaDaModificare = { ...req.body, ID_atleta: req.params.ID_atleta };
        const success = await atletaDAO.updateAtleta(conn, atletaDaModificare);
        await conn.commit();
        if (success) {
            res.status(200).json({ message: 'Atleta modificato con successo' });
        } else {
            res.status(404).json({ erroreMsg: 'Atleta non trovato' });
        }
    } catch (error) {
        console.error(`routes/atleta.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({ erroreMsg: error.message });
    } finally {
        await conn.close();
    }
});

// DELETE /atleti/:ID_atleta - Cancella un atleta (soft delete)
router.delete('/atleti/:ID_atleta', async function(req, res) {
    conn = await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        const success = await atletaDAO.deleteAtleta(conn, req.params.ID_atleta);
        await conn.commit();
        if (success) {
            res.status(200).json({ message: 'Atleta cancellato con successo' });
        } else {
            res.status(404).json({ erroreMsg: 'Atleta non trovato' });
        }
    } catch (error) {
        console.error(`routes/atleta.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({ erroreMsg: error.message });
    } finally {
        await conn.close();
    }
});

module.exports = router;