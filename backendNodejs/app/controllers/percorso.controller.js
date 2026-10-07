const db = require("../models");
const Mezzo = require("../models/mezzo.model");
const Percorso = require("../models/percorso.model");

exports.create = (req, res) => {
    // Validate request
    if (!req.body.ID_mezzo) {
      res.status(400).send({ message: "campo targa non può essere vuoto!" });
      return;
    }

    
  
    // Create a Tutorial
    const percorso = new Percorso({
        ordine_percorso: req.body.ordine_percorso,
        latitudine:req.body.latitudine,
        longitudine:req.body.longitudine,
        raggio:req.body.raggio
    });
  
    // Save Tutorial in the database
   percorso.save(percorso)
      .then(data => {
        if (req.body.ID_mezzo) {
            Mezzo.find(
              {
                targa: { $in: req.body.targa }
              },
              (err, mezzi) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
      
                percorso.ID_mezzo = mezzi.map(mezzo => mezzo._id);
                percorso.save(err => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
      
                  res.send({ message: "Mezzo Registrato con successo!" });
                });
              }
            );
          } else {
            Mezzo.findOne({ targa: "aa123aa" }, (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
      
            
              mezzo.save(err => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
      
                res.send({ message: "Posizione Registrata con successo!" });
              });
            });
        }
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "qualcosa è andato storto."
        });
      });
  };


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const targa = req.query.targa;
  var condition = targa ? { targa: { $regex: new RegExp(targa), $options: "i" } } : {};

  Mezzo.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "qualcosa è andato storto."
      });
    });
};

