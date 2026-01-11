const express = require('express');
const db = require('../services/db');
const torneoDAO = require('../dao/torneoDAO');
const partecipaDAO = require('../dao/partecipaDAO');
const partitaDAO = require('../dao/partitaDAO');
const counterDAO = require('../dao/counterDAO');

const router = express.Router();

// GET /tornei - Recupera tutti i tornei
router.get('/tornei', async function(req, res) {
    conn = await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        res.json(await torneoDAO.getAllTornei(conn, req.query));
        await conn.commit();
    } catch (error) {
        console.error(`routes/torneo.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({ erroreMsg: error.message });
    } finally {
        await conn.close();
    }
});

// GET /tornei/:ID_torneo/dettagli - Recupera dettagli completi torneo con atleti e punteggi
router.get('/tornei/:ID_torneo/dettagli', async (req, res) => {
    conn = await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        // Estrai l'ID del torneo dai parametri della richiesta
        const ID_torneo = req.params.ID_torneo;
        
        // 1. Recupera i dati del torneo
        const torneoData = await torneoDAO.getTorneoById(conn, ID_torneo);
        if (torneoData.length === 0) {
            return res.status(404).json({ error: 'Torneo non trovato' });
        }

        // Prendi il primo (e unico) elemento dell'array dei dati del torneo
        const torneo = torneoData[0];
        
        // 2. Recupera gli atleti iscritti al torneo
        const atleti = await partecipaDAO.getAtletiByTorneo(conn, ID_torneo);
        
        // 3. Recupera tutte le partite del torneo
        const partite = await partitaDAO.getPartiteByTorneo(conn, ID_torneo);
        
        // 4. Definisci le medie invisibili per categoria
        const mediaInvisibile = {
            'Esordiente': 140,
            'Cadetto': 160,
            'Eccellenza': 180,
            'Professionista': 200
        };
        
        const punteggioBase = mediaInvisibile[torneo.Categoria] * torneo.Numero_partite;
        
        // 5. Aggrega i dati per atleta
        const risultati = atleti.map(atleta => {
            // Filtra le partite di questo atleta
            const partiteAtleta = partite.filter(p => p.ID_atleta_gioca === atleta.ID_atleta);
            
            // Crea un oggetto con i punteggi per partita
            const punteggi = {};
            let totale = 0;
            let numeroPartiteGiocate = 0;
            
            partiteAtleta.forEach(partita => {
                punteggi[`partita_${partita.ID_partita}`] = partita.Punteggio;

                if (partita.Punteggio && partita.Punteggio > 0) {
                    totale += partita.Punteggio;
                    numeroPartiteGiocate++;
                }
            });
            
            const media = numeroPartiteGiocate > 0 ? (totale / numeroPartiteGiocate).toFixed(2) : 0;
            const plusMinus = totale - punteggioBase;
            
            return {
                Nome: atleta.Nome,
                Cognome: atleta.Cognome,
                ...punteggi,
                Totale: totale,
                Media: parseFloat(media),
                PlusMinus: plusMinus
            };
        });
        
        res.json(risultati);
        await conn.commit();
    } catch (error) {
        console.error(`routes/torneo.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({ erroreMsg: error.message });
    } finally {
        await conn.close();
    }
});

// POST /tornei - Crea un nuovo torneo
router.post('/tornei', async (req, res) => {
    conn = await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        torneo = req.body;
        nextId = await counterDAO.nextId(conn, 'torneo');
        torneo.ID_torneo = nextId;
        nuovoTorneo = await torneoDAO.createTorneo(conn, torneo);
        if (nuovoTorneo != null) {
            res.status(201);
            res.json(nuovoTorneo);
        } else {
            res.status(500);
        }
        await conn.commit();
    } catch (error) {
        console.error(`routes/torneo.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({ erroreMsg: error.message });
    } finally {
        await conn.close();
    }
});

// PUT /tornei/:ID_torneo - Modifica un torneo esistente
router.put('/tornei/:ID_torneo', async (req, res) => {
    conn = await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        const torneoDaModificare = { ...req.body, ID_torneo: req.params.ID_torneo };
        const success = await torneoDAO.updateTorneo(conn, torneoDaModificare);
        await conn.commit();
        if (success) {
            res.status(200).json({ message: 'Torneo modificato con successo' });
        } else {
            res.status(404).json({ erroreMsg: 'Torneo non trovato' });
        }
    } catch (error) {
        console.error(`routes/torneo.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({ erroreMsg: error.message });
    } finally {
        await conn.close();
    }
});

// DELETE /tornei/:ID_torneo - Cancella un torneo (soft delete)
router.delete('/tornei/:ID_torneo', async (req, res) => {
    conn = await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        const success = await torneoDAO.deleteTorneo(conn, req.params.ID_torneo);
        await conn.commit();
        if (success) {
            res.status(200).json({ message: 'Torneo cancellato con successo' });
        } else {
            res.status(404).json({ erroreMsg: 'Torneo non trovato' });
        }
    } catch (error) {
        console.error(`routes/torneo.js:`, error.message, error.stack);
        await conn.rollback();
        res.status(400);
        res.json({ erroreMsg: error.message });
    } finally {
        await conn.close();
    }
});

module.exports = router;