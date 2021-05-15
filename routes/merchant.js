'use strict'

var express = require('express');
var router = express.Router();
var MerchantController = require('../controllers/merchant');
//router.get('/get', MerchantController.dataTransaction);

router.post('/merchantsData', MerchantController.dataTransaction);
router.post('/dataOfCompany', MerchantController.dataOfCompany);
router.get('/getData', MerchantController.getData);
router.post('/getCompany', MerchantController.getCompany);

module.exports = router;
