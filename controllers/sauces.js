const Sauces = require('../models/Sauces');


exports.createSauces = (req, res, next) => {
    delete req.body._id
     const sauces = new Sauces({
         ...req.body
     });
     sauces.save()
     .then(() => res.status(201).json({ message : ' Objet enregistré'}))
     .catch(error => res.status(400).json({ error }));
  }

  exports.modifySauces = (req, res, next) => {
    Sauces.updateOne( {  _id: req.params.id}, { ...req.body, _id: req.params.id })
    .then(()=> res.status(200).json({ message: 'Objet modifié'})) 
    .catch(error => res.status(400).json({ error }));
}

exports.deleteSauces = (req, res, next) => {
    Sauces.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé'}))
    .catch(error => res.status(400).json({ error}));
} 

exports.getOneSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error}));
}

exports.getAllSauces = (req, res, next) => {
    Sauces.find()
    .then(lesSauces => res.status(200).json(lesSauces))
    .catch(error => res.status(400).json({ error}));
}