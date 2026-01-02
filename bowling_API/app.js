const express = require('express')
var cors=require('cors');

const atletaRouter = require("./routes/atleta");
const pallaRouter = require("./routes/palla");
const partecipaRouter = require("./routes/partecipa");
const partitaRouter = require("./routes/partita");
const torneoRouter = require("./routes/torneo");
const utenteRouter = require("./routes/utente");

const app = express()
const port = 3000
const contextPath = '/api';

app.use(cors({origin:"http://localhost:4200"}));
app.use(express.json()) // for parsing application/json
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(contextPath, atletaRouter);
app.use(contextPath, pallaRouter);
app.use(contextPath, partecipaRouter);
app.use(contextPath, partitaRouter);
app.use(contextPath, torneoRouter);
app.use(contextPath, utenteRouter);

app.all('*', function(req, res){
  res.status(404);
  res.json({erroreMsg: "Resource Not Found"});
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})