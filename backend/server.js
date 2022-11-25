const express = require("express");
const cors = require("cors");
const connect_db = require("./app/config/db.config.js");
const dotenv = require("dotenv");
const client = require('prom-client');

const app = express();
dotenv.config();

var corsOptions = {
  origin: process.env.CORSURL || "http://localhost:4200"
};

const PORT = process.env.PORT || 3000;

connect_db();

app.use(cors(corsOptions));

app.use(express.json());

require('./app/models/index.js');
require('./app/config/passport');
app.use(require("./app/routes/index"));

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const counterHomeEndpoint = new client.Counter({
    name: 'counterHomeEndpoint',
    help: 'The total number of processed requests'
});

const counterMessageEndpoint = new client.Counter({
    name: 'counterMessageEndpoint',
    help: 'The total number of processed requests to get endpoint'
});


app.get('/', (req, res) => {
    counterHomeEndpoint.inc();
    res.send('Hello world\n');
});

app.get('/message', (req, res) => {
    counterMessageEndpoint.inc();
    res.send('Message endpoint\n');
});


app.get('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType);
    // res.end(client.register.metrics());
    client.register.metrics().then(data => res.send(data));
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})