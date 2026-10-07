      const mongoose = require("mongoose");
      const PosizioneModel= mongoose.model(
          "Posizione",
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
            data_ora: { type : Date, default: Date.now }
          
  
  
          })
        );
        
        module.exports = PosizioneModel;