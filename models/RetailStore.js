const mongoose = require('mongoose');

/**
* Creating the schema with storeID, sku,
product_name, price and updated
*/
const RetailStoreSchema = new mongoose.Schema({
	storeId: {
		type: String,
		required: true
	},
	sku: {
	type: String,
	required: true
	},
	product_name: {
	type: String,
	required: true
	},
	price: {
	type: String,
	required: true
	},
	updated: {
        type: Date,
        required:true,
        default: Date.now,
    }
});

/* Exporting schema with collection as CrudOperations */
const Retail = mongoose.model('RetailStore', RetailStoreSchema);

module.exports = Retail;
