'use strict'

var express = require('express');
var router = express.Router();
var MerchantController = require('../controllers/merchant');
//router.get('/get', MerchantController.dataTransaction);

router.post('/merchantsDataIn', MerchantController.dataTransaction);
router.put('/merchantsDataUpdate', MerchantController.updateTransaction);
router.post('/dataOfCompany', MerchantController.dataOfCompany);
router.get('/getData', MerchantController.getData);
router.post('/getCompany', MerchantController.getCompany);
router.get('/getHistory', MerchantController.getHistory);

module.exports = router;
