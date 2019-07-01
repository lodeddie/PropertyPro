const express = require('express')
const propertyController = require('../controllers/property')
const router = express.Router()
const upload = require('../middlewares/upload')
const verifyToken = require('../middlewares/jwt').jwtHelper.verifyToken
router.post('/property', verifyToken, upload, propertyController.createProperty)
router.get('/property', propertyController.getAll)
router.get('/property/:id', propertyController.getSpecificAdvert)
router.delete('/property/:id',verifyToken, propertyController.deleteProperty)
module.exports = router

