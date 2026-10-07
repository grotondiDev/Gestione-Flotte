const mongoose = require("mongoose");

const Tipopos = mongoose.model(
  "Tipopos",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Tipopos;