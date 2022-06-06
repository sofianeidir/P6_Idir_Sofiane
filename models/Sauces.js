const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({  // modelesauce
    title: { type: String, require: true},
    description: { type: String, require: true},
    imageUrl: { type: String, require: true},
    userId: { type: String, require: true},
    price: { type: Number, require: true},
   
    // userId: { type: String, required: true },
    // name: { type: String, required: true },
    // manufacturer: { type: String, required: true },
    // description: { type: String, required: true },
    // mainPepper: { type: String, required: true },
    // imageUrl: { type: String, required: true },
    // heat: { type: Number, required: true },
    // likes: { type: Number },
    // dislikes: { type: Number },
    // usersLiked: { type: [String] },
    // usersDisliked: { type: [Array] },
}); 




module.exports = mongoose.model('Sauces', saucesSchema);


