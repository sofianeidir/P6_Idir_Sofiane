const express = require('express');

const router = express.Router();
const saucesCtrl = require('../controllers/sauces')

// Routes avec les métiers 
router.post('/', saucesCtrl.createSauces);
router.put('/:id', saucesCtrl.modifySauces);
router.delete('/:id', saucesCtrl.deleteSauces)
router.get('/:id', saucesCtrl.getOneSauce);
router.get('/', saucesCtrl.getAllSauces);

module.exports = router;