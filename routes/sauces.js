const express = require('express');

const router = express.Router();
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');

// Routes avec les métiers 
router.post('/', auth, saucesCtrl.createSauces);
router.put('/:id', auth, saucesCtrl.modifySauces);
router.delete('/:id', auth, saucesCtrl.deleteSauces)
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);

module.exports = router;