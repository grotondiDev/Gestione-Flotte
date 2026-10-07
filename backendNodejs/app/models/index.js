const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.mezzi = require("./mezzo.model");
db.percorsi = require("./percorso.model");
db.tipopos = require("./tipopos.model");
db.posizione = require("./posizione.model");

db.ROLES = ["user", "admin", "moderator"];
db.TIPOPOS = ["INIZIO","INTERMEDIO","FINE"];


module.exports = db;

