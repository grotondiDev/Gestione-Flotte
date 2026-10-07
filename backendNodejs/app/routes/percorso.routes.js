module.exports = app => {
    const percorsi = require("../controllers/percorso.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", percorsi.create);
  
    // Retrieve all Tutorials
    router.get("/", percorsi.findAll);
    
    app.use("/api/percorsi", router);
  };