'use strict'

var express = require('express');
var router = express.Router();

var MerchantController = require('../controllers/merchant');
//var md_auth = require('../middlewares/authenticated');

//router.get('/get', MerchantController.dataTransaction);
router.post('/merchantsData', MerchantController.dataTransaction);
router.post('/getData', MerchantController.getData);


module.exports = router;
