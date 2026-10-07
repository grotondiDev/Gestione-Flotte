const mongoose = require("mongoose");
    const MezzoModel = mongoose.model(
        "Mezzo",
        new mongoose.Schema({
            sistema_operativo: String,
            targa: String,
            scadenza_assicurazione: Date,
            scadenza_bollo: Date,
            posizioni:[
                {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Posizione'
            }
        ]


        })
      );
      
      module.exports = MezzoModel;
      