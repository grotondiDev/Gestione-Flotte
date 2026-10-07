module.exports = app => {
    const posizione = require("../controllers/posizione.controller.js");
  
    var router = require("express").Router();
  
    // Crea nuova  posizione
    router.post("/:targa", posizione.create);
  
    // tutte le  posizioni
    router.get("/", posizione.findAll);
  

  
    //posizioni per  targa
   router.get("/:mezzoId", posizione.findOne);
  
 
  
    app.use("/api/posizione", router);
  };