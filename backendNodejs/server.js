const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// content-type - application/json
app.use(bodyParser.json());

// content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

const Mezzo = db.mezzi;
const Percorsi = db.percorsi;
const Tipopos = db.tipopos;
const Posizione = db.posizione;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// route seplice
app.get("/", (req, res) => {
  res.json({ message: "Benvenuti in Gestione Flotte di Giorgio Michele Rotondi" });
});

// routes file per componente 
require("./app/routes/mezzo.routes")(app);
require("./app/routes/percorso.routes")(app);
require("./app/routes/posizione.routes")(app);
require("./app/routes/tipopos.routes")(app);

// setting porta in ascolto 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
//database insermento dati esempio 
function initial() {
    
  Mezzo.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Mezzo({
        sistema_operativo: "Android",
        targa:"TR123VX",
        scadenza_assicurazione:2021/12/31,
        scadenza_bollo:2021/12/31,
        utente:["61a0bcdb461f4f54c05f278d"]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("inserito mezzo di prova ");
      });

      
    }
  });

  Posizione.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Posizione({
      
      targa:"TR123VX",
      latitudine: "41.868604",
      longitudine: "12.376669"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("inserita posizione di prova");
      });

      
    }
  });

  
  Tipopos.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Tipopos({
        name: "Inizio"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("tipo posizione Inizio Aggiunto");
      });

      new Tipopos({
        name: "Intermedio"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("tipo posizione Intermedio Aggiunto");
      });

      new Tipopos({
        name: "Fine"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("tipo posizione fine Aggiunto");
      });
    }
  });



  Percorsi.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Percorsi({
            ID_mezzo : "61adbe79845759c3e5e66f72",
            ID_tipopos:"",
            ordine_percorso: "",
            latitudine: "",
            longitudine: "",
            raggio: ""

      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      
    }
  });
}