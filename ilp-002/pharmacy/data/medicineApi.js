"use strict";

var medicines = require('./medicineData').medicines;
var _ = require('lodash');

var currentID = 3;
var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

var MedicineApi = {
	getAllMedicines: function(callback) {
		callback(null, _clone(medicines));
	},
  getMedicineById: function(id, callback) {
		var medicine = _.find(medicines, {id: parseInt(id)});
		callback (null, _clone(medicine));
  },
  updateMedicineById: function(id, medicine, callback) {
			var existingMedicineIndex = _.indexOf(medicines, _.find(medicines, {id: parseInt(id)}));
			medicine.id = parseInt(id);
			medicines.splice(existingMedicineIndex, 1, medicine);
			callback (null);
  },
	saveMedicine: function(medicine, callback) {
		currentID = currentID + 1;
    medicine.id = currentID;
    medicines.push(medicine);
		callback(null, _clone(medicine));
	},
	deleteMedicineById: function(id, callback) {
		_.remove(medicines, { id: parseInt(id)});
    callback(null);
	}
};

module.exports = MedicineApi;
