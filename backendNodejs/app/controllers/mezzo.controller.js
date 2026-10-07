const db = require("../models");

const Mezzo = require("../models/mezzo.model");
const Posizioni = require("../models/posizione.model");





// Crea e salva nuovo mezzo
exports.create = (req, res) => {
  // Validate request
 console.log(req.body);

  //crea mezzo
  const mezzo = new Mezzo({
      sistema_operativo: req.body.sistema_operativo,
      targa:req.body.targa,
      scadenza_assicurazione:req.body.scadenza_assicurazione,
      scadenza_bollo:req.body.scadenza_bollo,
  
  });

  // salva mezzo nel database 
 mezzo.save(mezzo)
    .then(data => {
      if(req.body.posizioni) {
          Posizioni.find(
            {
              mezzoId: { $in: req.body._id }
            },
            (err, posizioni) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
    
              mezzo.posizioni = posizioni.map(posizione => posizione._id);
              mezzo.save(err => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
    
                res.send({ message: "Mezzo Registrato con successo!" });
              });
            }
          );

        }
        
        
        else {
          mezzo.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
    
              res.send({ message: "Mezzo Registrato con successo!" });
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

exports.getAllPosizioni = async(req, res) =>{


Mezzo.aggregate([{
  '$lookup': {
    'from': "posiziones",
    'let': {
      'mezzoId': '$_id'
    },
    'pipeline': [{
        '$match': { '$expr': { '$eq': ['$mezzoId', '$$mezzoId'] } }
      }, {
        '$sort': {  'data_ora': -1 }
      }, {
        '$limit': 1
      },
    ],
    'as': 'posizioni'
  }
}
]).then((result) => {
  console.log(result);
  res.send(result);
})
.catch((error) => {
  console.log(error);
});
}

// estrai tutti i mezzi dal database

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
          err.message || "Qualcosa è andato storto nella ricerca dei mezzi"
      });
    });
};

// Trova un singolo Mezzo
exports.findOne = (req, res) => {
  const id = req.params.id;

  Mezzo.findById(id)
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
};

//Aggiorna un mezzo in base all'id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "I dati non possono essere vuoti per l'aggiornamento del mezzo!"
    });
  }

  const id = req.params.id;

  Mezzo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `impossibile aggiornare mezzo id=${id}. mezzo non trovato!`
        });
      } else res.send({ message: "Mezzo aggiornato con successo." });
    })
    .catch(err => {
      res.status(500).send({
        message: "errore di aggiornamento id=" + id
      });
    });
};

// Cancella un mezzo specifico id
exports.delete = (req, res) => {
  const id = req.params.id;

  Mezzo.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `impossibile cancellare mezzo con id=${id}. non è stato trovato!`
        });
      } else {
        res.send({
          message: "Mezzo Cancellato con successo!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "impossibile trovare il mezzo con id=" + id
      });
    });
};

// Canella tutti i mezzi dal database
exports.deleteAll = (req, res) => {
  Mezzo.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Mezzi Cancellato con successo!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "qualcosa è andato storto!."
      });
    });
};


