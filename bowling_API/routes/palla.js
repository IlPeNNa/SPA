const express = require('express');
const db = require('../services/db');
const pallaDAO = require('../dao/pallaDAO');
const counterDAO = require('../dao/counterDAO');

const router = express.Router();

// GET /palle/:ID_atleta - Recupera le palle di un atleta
router.get('/palle/:ID_atleta', async function(req, res) {
    conn = await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        const ID_atleta = req.params.ID_atleta;
        res.json(await pallaDAO.getPalleByAtleta(conn, ID_atleta));
        await conn.commit();
    } catch (error) {
        console.error(`routes/palla.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({ erroreMsg: error.message });
    } finally {
        await conn.close();
    }
});

// POST /palle - Inserisce una nuova palla
router.post('/palle', async function(req, res) {
    conn = await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        palla = req.body;
        nextId = await counterDAO.nextId(conn, 'palla');
        palla.ID_palla = nextId;
        nuovaPalla = await pallaDAO.insertPalla(conn, palla);
        if (nuovaPalla != null) {
            res.status(201)
            res.json(nuovaPalla);
        } else {
            res.status(500);
        }
        await conn.commit();
    } catch (error) {
        console.error(`routes/palla.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({ erroreMsg: error.message });
    } finally {
        await conn.close();
    }
});

// PUT /palle/:ID_palla - Modifica una palla esistente
router.put('/palle/:ID_palla', async function(req, res) {
    conn = await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        const pallaDaModificare = { ...req.body, ID_palla: req.params.ID_palla };
        const success = await pallaDAO.updatePalla(conn, pallaDaModificare);
        await conn.commit();
        if (success) {
            res.status(200).json({ message: 'Palla modificata con successo' });
        } else {
            res.status(404).json({ erroreMsg: 'Palla non trovata' });
        }
    } catch (error) {
        console.error(`routes/palla.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({ erroreMsg: error.message });
    } finally {
        await conn.close();
    }
});

// DELETE /palle/:ID_palla - Cancella una palla (soft delete)
router.delete('/palle/:ID_palla', async function(req, res) {
    conn = await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        const success = await pallaDAO.deletePalla(conn, req.params.ID_palla);
        await conn.commit();
        if (success) {
            res.status(200).json({ message: 'Palla cancellata con successo' });
        } else {
            res.status(404).json({ erroreMsg: 'Palla non trovata' });
        }
    } catch (error) {
        console.error(`routes/palla.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({ erroreMsg: error.message });
    } finally {
        await conn.close();
    }
});

module.exports = router;