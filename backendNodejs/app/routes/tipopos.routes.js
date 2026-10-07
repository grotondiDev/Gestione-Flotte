module.exports = app => {
    const tipopos = require("../controllers/tipopos.controller.js");
  
    var router = require("express").Router();
  
    
    // tutte le  posizioni
    router.get("/", tipopos.findAll);
  

  
  
  /*
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Create a new Tutorial
    router.delete("/", tutorials.deleteAll);*/
  
    app.use("/api/tipopos", router);
  };