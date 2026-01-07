const express = require('express');
const db = require('../services/db');
const utenteDAO = require('../dao/utenteDAO');

const router = express.Router();

router.get('/utenti', async function (req, res) {
    conn=await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        res.json(await utenteDAO.findUsers(conn,req.query));
        await conn.commit();
    } catch (err) {
        console.error(`routes/utente.js:`, err.message, err.stack);
        await conn.rollback();
        res.status(400);
        res.json({erroreMsg: err.message});
    } finally {
        await conn.close();
    }
  });

  router.get('/utenti/:ID_utente', async function (req, res) {
    conn=await db.getConnection();
    await conn.beginTransaction();
    res.setHeader('Content-Type', 'application/json');
    try {
        res.json(await utenteDAO.findUserById(conn, req.params.ID_utente));
        conn.commit();
    } catch (err) {
        console.error(`routes/utente.js:`, err.message, err.stack);
        await conn.rollback();
        res.status(400);
        res.json({erroreMsg: err.message});
    } finally {
        await conn.close();
    }
  });

module.exports = router;