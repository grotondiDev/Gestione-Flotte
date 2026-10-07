const mongoose = require("mongoose");
    const PercorsoModel = mongoose.model(
        "Percorso",
        new mongoose.Schema({
            mezzoId : {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Mezzo"
            },
            tipoposId : {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Tipopos"
            },
          
            latitudine: String,
            longitudine: String,
            raggio: String
        })
      );
      
      module.exports = PercorsoModel;