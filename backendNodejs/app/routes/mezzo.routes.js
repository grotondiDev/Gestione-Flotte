module.exports = app => {
    const mezzi = require("../controllers/mezzo.controller.js");
  
    var router = require("express").Router();
  
    // nuovo mezzo
    router.post("/", mezzi.create);
  
    // add mezzo
    router.get("/", mezzi.findAll);
  
    router.get("/posizioni", mezzi.getAllPosizioni);

    // trova mezzo per id 
    router.get("/:id", mezzi.findOne);
    
    app.use("/api/mezzi", router);
  };