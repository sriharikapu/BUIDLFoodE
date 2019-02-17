const express = require('express');
const app = express();
const port = 3535;
const bodyParser = require('body-parser');
const routes = require('./server/routes'); //import routes

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);//register routes

//app.get('/', (req, res) => res.send('Hello World!'))

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))