const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes avec les métiers 
router.post('/', auth, multer, saucesCtrl.createSauces);
router.put('/:id', auth, saucesCtrl.modifySauces);
router.delete('/:id', auth, saucesCtrl.deleteSauces)
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);



module.exports = router;