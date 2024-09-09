const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const port = 8099;

app.get('/', (req, res) => {
    res.status(200).send("success");
});

app.listen(port, () => {console.log (`App now listening on ${port}\n`);});

app.post('/', (req, res) => {
    console.log(req.body);

  });

