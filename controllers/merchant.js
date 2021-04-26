'use strict'
var axios = require('axios');
var Merchant = require('../models/Merchants');

function dataTransaction(req, res){
  console.log(req.body);
  var merchant = new Merchant();
  merchant.fid = req.body.fid;
  merchant.code = req.body.code;
  merchant.ubication = req.body.ubication;
  merchant.name = req.body.name;
  merchant.previousStage = req.body.previousStage;
  merchant.currentStage = req.body.currentStage;
  merchant.save((err, merchantStored) => {
    if(err) {
      //console.log(err);
      res.status(500).send({ message: 'Error al guardar los datos' });
    }else{
      if(!merchantStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado' });
      }else{
        serviceInit(merchantStored, function(data, err) {
          res.status(200).send({ message: data.message, addData: data.addData });
        });
      }
    }
  });
}

function serviceInit(merchantStored, next) {
    var url = 'http://'+host+':'+port.traceability+''+path.traceability+'';
    axios.post(url, {
      id: merchantStored._id,
      fid: merchantStored.fid,
      code: merchantStored.code,
      ubication: merchantStored.ubication,
      name: merchantStored.name,
      previousStage: merchantStored.previousStage,
      currentStage: merchantStored.currentStage
    })
    .then(response => {
        //console.log(response.data);
        next(response.data, null);
    })
    .catch(error => {
        console.log(error);
        next(null, error);
    });
}

function getData(req, res) {
  Merchant.find((err, merchantStored) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!merchantStored){
        res.status(200).send({message: null});
      }else{
        res.status(200).send({message: merchantStored});
      }
    }
  });
}

module.exports = {
	dataTransaction,
  getData
};
