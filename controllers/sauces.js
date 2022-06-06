const Sauces = require('../models/Sauces');


exports.createSauces = (req, res, next) => {
    const saucesObject = JSON.parse(req.body.sauce);
    console.log(saucesObject)
    delete saucesObject._id;
     const sauce = new Sauces({
         ...saucesObject,
        //  likes: 0,
        //  dislikes: 0,
        //  usersDisliked: [],
        //  usersLiked: [],
         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     });
     sauce.save()
     .then(() => res.status(201).json({ message: ' Sauce enregistré'}))
     .catch(error => res.status(400).json({ error }));
  }

  exports.modifySauces = (req, res, next) => {
    Sauces.updateOne( {  _id: req.params.id}, { ...req.body, _id: req.params.id })
    .then(()=> res.status(200).json({ message: 'Objet modifié'})) 
    .catch(error => res.status(400).json({ error }));
}

exports.deleteSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id }).then(
        (sauce) =>{
            if (!sauce) {
                return res.status(404).json({
                    error: new Error('Objet non trouvé')
                });
            }
            if (sauce.userId !== req.auth.userId) {
                return res.status(401).json({
                    error: new Error(' Requête non autorisée')
                });
            }
            Sauces.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé'}))
            .catch(error => res.status(400).json({ error}));
        } )
  
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

exports.likeSauce = (req, res, next) => {
  const sauceId = req.params.id;
  const userId = req.body.userId;
  const like = req.body.like;
  // 1. user likes a sauce for the first time (like === 1)
  // pushing the userId to usersLiked array; incrementing likes
  if (like === 1) {
    Sauce.updateOne(
      { _id: sauceId },
      {
        $inc: { likes: like },
        $push: { usersLiked: userId },
      }
    )
      .then((sauce) => res.status(200).json({ message: "Sauce appréciée" }))
      .catch((error) => res.status(500).json({ error }));
  }

  // 2. user DISlikes a sauce for the first time (like === -1)
  // pushing the userId to usersLiked array; one less like.
  else if (like === -1) {
    Sauce.updateOne(
      { _id: sauceId },
      {
        $inc: { dislikes: -1 * like },
        $push: { usersDisliked: userId },
      }
    )
      .then((sauce) => res.status(200).json({ message: "Sauce dépréciée" }))
      .catch((error) => res.status(500).json({ error }));
  }
  // 3. User changes his mind
  // 3.1. user is taking back his like :
  else {
    Sauce.findOne({ _id: sauceId })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          )
            .then((sauce) => {
              res.status(200).json({ message: "Sauce dépréciée" });
            })
            .catch((error) => res.status(500).json({ error }));
          // 3.2 user is changing his mind on his dislike
        } else if (sauce.usersDisliked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            {
              $pull: { usersDisliked: userId },
              $inc: { dislikes: -1 },
            }
          )
            .then((sauce) => {
              res.status(200).json({ message: "Sauce appréciée" });
            })
            .catch((error) => res.status(500).json({ error }));
        }
      })
      .catch((error) => res.status(401).json({ error }));
  }
};