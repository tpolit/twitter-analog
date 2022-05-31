const path = require('path');
const api = require('./api.js');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

// Connexion à la bd
const sqlite3 = require('sqlite3').verbose();
const DataStore = require("nedb");
var db = {};
db.users = new sqlite3.Database(':memory:');
db.followers = new sqlite3.Database(':memory:');
db.messages = new DataStore();
db.messages.loadDatabase();

express = require('express');
const app = express()
api_1 = require("./api.js");
const session = require("express-session");

app.use(session({
    secret: "technoweb rocks",
    name: "session_id"
}));

app.use('/api', api.default(db));

// Démarre le serveur
app.on('close', () => {
    db.user.close();
});
exports.default = app;

