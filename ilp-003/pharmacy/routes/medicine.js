var MedicineApi = require('../data/medicineApi');
var medicines = require('../data/medicineData').medicines;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  MedicineApi.getAllMedicines(function(err, items) {
    //res.render('medicine/index', {title: 'Medicines', medicines: items})
    res.json(medicines);
	});
});

router.get('/create', function(req, res) {
  //res.render('medicine/create');
  res.json(medicines);
  //response.setHeader('Access-Control-Allow-Origin', '*');
});

router.post('/create', function(req, res) {
  var medicine = {};
  medicine.id=req.body.id;
  medicine.name = req.body.name;
  medicine.manufacturer = req.body.manufacturer;
  medicine.type = req.body.type;
  medicine.batchno = req.body.batchno;
  medicine.expdate = req.body.expdate;
  medicine.price = req.body.price;


  MedicineApi.saveMedicine(medicine, function(err, medicine) {
    //res.redirect('/medicine');
    res.json(medicines);
  });
});

router.get('/edit/:id', function(req, res) {
  //MedicineApi.getMedicineById(req.params.id, function(err, medicine) {
    //res.render('medicine/edit', {medicine: medicine});
    res.json(medicines);
 // });

});

router.post('/edit/:id', function(req, res) {
  var updatedMedicine = {};
  updatedMedicine.id=req.body.id;
  updatedMedicine.name = req.body.name;
  updatedMedicine.manufacturer = req.body.manufacturer;
  updatedMedicine.type = req.body.type;
  updatedMedicine.batchno = req.body.batchno;
  updatedMedicine.expdate = req.body.expdate;
  updatedMedicine.price = req.body.price;
  MedicineApi.updateMedicineById(req.params.id, updatedMedicine, function(err) {
			res.json(medicines);
  });

});

router.get('/delete/:id', function(req, res) {
  MedicineApi.deleteMedicineById(req.params.id, function(err) {
    //res.redirect('/medicine');
    res.json(medicines);
  });
});

module.exports = router;
