const db = require("../models");

const Mezzo = require("../models/mezzo.model");
const Percorso = require("../models/percorso.model");
const Posizione = require("../models/posizione.model");
const Tipopos = require("../models/tipopos.model");
const { percorsi } = require("../models");
exports.create = (req, res) => {
    // valida  request
    console.log(req.params);
    if (!req.params.targa) {
      res.status(400).send({ message: "campo targa non può essere vuoto!" });
      return;
    }

    
  
    // crea posizione
    const posizione = new Posizione({
      tipoposId : req.body.tipoposId,
      latitudine: req.body.latitudine,
      longitudine: req.body.longitudine,
     targa:req.params.targa
    });
  
    // salva posizione 
   posizione.save(posizione)
      .then(data => {
        if (req.params.targa) {
            Mezzo.find(
              {
                targa: { $in: req.params.targa },
              },
              (err, mezzi) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
              
                posizione.mezzoId = mezzi.map(mezzo => mezzo._id);
                posizione.save(err => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
      
                  res.send({ message: "Mezzo Registrato con successo!" });
                });
              }
            )
        }
           else {
            Mezzo.findOne({ targa: "aa123aa" }, (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              posizione.save(err => {
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


// tutte le posizioni
exports.findAll = (req, res) => {
  const ID_mezzo = req.query.mezzoId;
  var condition = ID_mezzo ? { mezzoId: { $regex: new RegExp(mezzoId), $options: "i" } } : {};

  Posizione.find(condition)
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




exports.findOne = (req, res) => {
  const ID_mezzo = req.query.mezzoId;
  var condition = ID_mezzo ? { mezzoId: { $regex: new RegExp(mezzoId), $options: "i" } } : { sort: { data_ora : -1 }};

  Posizione.find(condition)
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
/*
exports.findOne = (req, res) => {
  const mezzoId = req.params.mezzoId;

  Posizione.find(mezzoId)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "mezzo non trovato id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "errore nella visualizzazione di id=" + id });
    });
};*/
