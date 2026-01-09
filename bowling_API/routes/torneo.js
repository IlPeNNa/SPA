const express = require('express');
const db = require('../services/db');
const torneoDAO = require('../dao/torneoDAO');
const partecipaDAO = require('../dao/partecipaDAO');
const partitaDAO = require('../dao/partitaDAO');

const router = express.Router();

// GET /tornei - Recupera tutti i tornei
router.get('/tornei', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const tornei = await torneoDAO.getAllTornei(connection);
        res.status(200).json(tornei);
    } catch (error) {
        console.error('Errore nel recupero dei tornei:', error);
        res.status(500).json({ error: 'Errore nel recupero dei tornei' });
    } finally {
        await connection.close();
    }
});

// GET /tornei/:ID_torneo/dettagli - Recupera dettagli completi torneo con atleti e punteggi
router.get('/tornei/:ID_torneo/dettagli', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const ID_torneo = req.params.ID_torneo;
        
        // 1. Recupera i dati del torneo
        const torneoData = await torneoDAO.getTorneoById(connection, ID_torneo);
        if (torneoData.length === 0) {
            return res.status(404).json({ error: 'Torneo non trovato' });
        }
        const torneo = torneoData[0];
        
        // 2. Recupera gli atleti iscritti al torneo
        const atleti = await partecipaDAO.getAtletiByTorneo(connection, ID_torneo);
        
        // 3. Recupera tutte le partite del torneo
        const partite = await partitaDAO.getPartiteByTorneo(connection, ID_torneo);
        
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
            
            partiteAtleta.forEach(partita => {
                punteggi[`partita_${partita.ID_partita}`] = partita.Punteggio;
                totale += partita.Punteggio || 0;
            });
            
            const numeroPartite = partiteAtleta.length;
            const media = numeroPartite > 0 ? (totale / numeroPartite).toFixed(2) : 0;
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
        
        res.status(200).json(risultati);
    } catch (error) {
        console.error('Errore nel recupero dei dettagli del torneo:', error);
        res.status(500).json({ error: 'Errore nel recupero dei dettagli del torneo' });
    } finally {
        await connection.close();
    }
});

// POST /tornei - Crea un nuovo torneo
router.post('/tornei', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const nuovoTorneo = await torneoDAO.createTorneo(connection, req.body);
        if (nuovoTorneo) {
            res.status(201).json(nuovoTorneo);
        } else {
            res.status(400).json({ error: 'Errore nella creazione del torneo' });
        }
    } catch (error) {
        console.error('Errore nella creazione del torneo:', error);
        res.status(500).json({ error: 'Errore nella creazione del torneo' });
    } finally {
        await connection.close();
    }
});

// PUT /tornei/:ID_torneo - Modifica un torneo esistente
router.put('/tornei/:ID_torneo', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const torneoDaModificare = { ...req.body, ID_torneo: req.params.ID_torneo };
        const success = await torneoDAO.updateTorneo(connection, torneoDaModificare);
        if (success) {
            res.status(200).json({ message: 'Torneo modificato con successo' });
        } else {
            res.status(404).json({ error: 'Torneo non trovato' });
        }
    } catch (error) {
        console.error('Errore nella modifica del torneo:', error);
        res.status(500).json({ error: 'Errore nella modifica del torneo' });
    } finally {
        await connection.close();
    }
});

// DELETE /tornei/:ID_torneo - Cancella un torneo (soft delete)
router.delete('/tornei/:ID_torneo', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const success = await torneoDAO.deleteTorneo(connection, req.params.ID_torneo);
        if (success) {
            res.status(200).json({ message: 'Torneo cancellato con successo' });
        } else {
            res.status(404).json({ error: 'Torneo non trovato' });
        }
    } catch (error) {
        console.error('Errore nella cancellazione del torneo:', error);
        res.status(500).json({ error: 'Errore nella cancellazione del torneo' });
    } finally {
        await connection.close();
    }
});

module.exports = router;