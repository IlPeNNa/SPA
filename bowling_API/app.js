const express = require('express')
var cors=require('cors');
const userRouter = require("./routes/user");
const contactRouter = require("./routes/contact");

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

app.use(contextPath, userRouter);
app.use(contextPath, contactRouter);

app.all('*', function(req, res){
  res.status(404);
  res.json({erroreMsg: "Resource Not Found"});
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})