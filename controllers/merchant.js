'use strict'
var axios = require('axios');
var Merchant = require('../models/Merchants');
var User = require('../models/Users');

function dataTransaction(req, res){
  var merchant = new Merchant();
  merchant.fid = req.body.fid;
  merchant.code = req.body.code;
  merchant.ubication = req.body.ubication;
  merchant.name = req.body.name;
  merchant.previousStage = req.body.previousStage;
  merchant.currentStage = req.body.currentStage;
  merchant.nameOfCompany = req.body.nameOfCompany;
  merchant.image = req.body.image;
  merchant.description = req.body.description;
  merchant.save((err, merchantStored) => {
    if(err) {
      //console.log(err);
      res.status(500).send({ message: 'Error al guardar los datos' });
    }else{
      if(!merchantStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado' });
      }else{
        serviceInit(merchantStored, function(data, err) {
          res.status(200).send({ message: data.message, addData: data.addData, info: data.info });
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
      currentStage: merchantStored.currentStage,
      image: merchantStored.image,
      description: merchantStored.description
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

function dataOfCompany(req, res) {
  var user = new User();
  user.email = req.body.email;
  user.nameOfCompany = req.body.nameOfCompany;
  user.save((err, userStored) => {
    if(err) {
      res.status(500).send({ message: 'Error al guardar los datos para el usuario' });
    }else{
      if(!userStored) {
        res.status(404).send({ message: 'El dato no ha sido guardado para el usuario' });
      }else{
        res.status(200).send({ message: true, user: userStored });
      }
    }
  });
}

function getCompany(req, res) {
  User.findOne({email: req.body.email}, (err, userStored) => {
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!userStored){
        res.status(200).send({message: null});
      }else{
        res.status(200).send({message: userStored});
      }
    }
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
  dataOfCompany,
  getCompany,
  getData
};
