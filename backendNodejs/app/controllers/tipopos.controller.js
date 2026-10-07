
exports.findAll = (req, res) => {
    const ID_mezzo = req.query.ID_mezzo;
    var condition = ID_mezzo ? { ID_mezzo: { $regex: new RegExp(ID_mezzo), $options: "i" } } : {};
  
    Mezzo.find(condition)
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
