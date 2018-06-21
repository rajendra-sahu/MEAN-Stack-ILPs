var MedicineApi = require('../data/medicineApi');
var medicines = require('../data/medicineData').medicines;
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose').set('debug', true);
var util = require('util');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb', {useMongoClient: true});

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Connection error', err);
});
db.once('open', function () {
  console.log('Connected to DB.');
});
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    manufacturer: String,
    type: String,
    batchno:String,
    expdate: String ,
    price: String,
});

/*var User = mongoose.model('user', userSchema);
var med= new User(medicines[0]);
  med.save(function (err, user)
   {
    if (err)
        return console.log(err);
    else
        console.log(user);
   });*/
medicines.forEach(function(value)
{
  var User = mongoose.model('user', userSchema);
  //for(let medicine of medicines)
  //{ 
    var med= new User(value);
    med.save(function (err, user)
     {
      if (err)
          return console.log(err);
      else
          console.log(user);
          
     });
  //}
  
});

router.get('/', function(req, res) {
  var User = mongoose.model('user', userSchema);
  /*MedicineApi.getAllMedicines(function(err, items) {
    //res.render('medicine/index', {title: 'Medicines', medicines: items})
    res.json(medicines);
  });*/
  User.find({}, function (err, user) {
    if (err)
        return console.log(err);
    else 
       {
        res.json(user);
        console.log(util.inspect(user, {depth: null, colors: true}));
        //console.log(user);
       }
        
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


  /*MedicineApi.saveMedicine(medicine, function(err, medicine) {
    //res.redirect('/medicine');
    res.json(medicines);
  });*/
  var User = mongoose.model('user', userSchema);
  var med= new User(medicine);
    med.save(function (err, user)
     {
      if (err)
          return console.log(err);
      else
          {console.log(user);
            //res.json(user);
            User.find({}, function (err, user) {
              if (err)
                  return console.log(err);
              else 
                 {
                  res.json(user);
                  console.log(util.inspect(user, {depth: null, colors: true}));
                  //console.log(user);
                 }
                  
            });
          }
     });/*.then(()=>{User.find({}, function (err, user)
               {
                  if (err)
                      return console.log(err);
                  else 
                    {
                      res.json(user);
                      console.log(util.inspect(user, {depth: null, colors: true}));
                      //console.log(user);
                    }
                }
               )
        });*/

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
  /*MedicineApi.updateMedicineById(req.params.id, updatedMedicine, function(err) {
			res.json(medicines);
  });*/
  var User = mongoose.model('user', userSchema);
  //var med= new User(updatedMedicine);
  User.update({ _id: req.body._id },
              //{$unset:{_id:""}},
              {$set:{id:req.body.id,name : req.body.name,manufacturer : req.body.manufacturer,type : req.body.type,batchno : req.body.batchno,expdate :req.body.expdate,price :req.body.price}},
              //{$set:med},
              function(err,user)
              {
                if (err)
                      return console.log(err);
                else
                    {
                      console.log(user);
                      //res.json(user);
                      User.find({}, function (err, user)
                      {
                        if (err)
                            return console.log(err);
                        else 
                          {
                            res.json(user);
                            console.log(util.inspect(user, {depth: null, colors: true}));
                            //console.log(user);
                          }
                            
                      });
                    }

              });

});

router.get('/delete/:id', function(req, res) {
  /*MedicineApi.deleteMedicineById(req.params._id, function(err) {
    //res.redirect('/medicine');
    res.json(medicines);
  });*/
  var User = mongoose.model('user', userSchema);
  User.remove({ id: req.params.id },
    function(err,user)
    {
      if (err)
            return console.log(err);
      else
          {
            console.log(user);
            //res.json(user);
            User.find({}, function (err, user)
            {
              if (err)
                  return console.log(err);
              else 
                {
                  res.json(user);
                  console.log(util.inspect(user, {depth: null, colors: true}));
                  //console.log(user);
                }
                  
            });
          }

    });
});

module.exports = router;
