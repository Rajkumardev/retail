
const fs = require('fs');
const fastcsv = require('fast-csv');
const RetailStore = require("../models/RetailStore");
const path = require('path');

exports.fileupload = function(req, res) {
	console.log("Inside file Upload!!")
	console.log('single route')
	console.log('file:'+JSON.stringify(req.file.path));


	let stream = fs.createReadStream(req.file.path)

	let csvData = [];

	let csvStream = fastcsv
		.parse()
		.on('error', error => console.error(error))
		.on("data", function(data) {
			dt = data[0].split(','); console.log("daaa" + data[0] +  data[1]  +  data[2]);
			csvData.push({
                storeId: `SID${Math.floor(Math.random() * 899999 + 100000)}`,
				sku: data[0],
				product_name: data[1],
				price: data[2]
			});
		})
		.on("end", async function() {
			// remove the first line: header
			csvData.shift();

			// save to the MongoDB database collection
			try{
				console.log("client:" + RetailStore);
				let CRUDinsert = await RetailStore.insertMany(
					csvData
				)
				console.log("CRUD Insert Many" + CRUDinsert)
				res.status(200).send(CRUDinsert);

			} catch(err){
				console.log("db error:" + err);
				res.status(400).send(err);
			}
			console.log(JSON.stringify(csvData));
            // fs.remove(req.file.path);

		});

	stream.pipe(csvStream);
}

exports.update = async function(req, res) {
	/* Taking the id */
	const id = req.params.StoreId;
    const options = req.body;

	try{
		/* Using findByIdAndUpdate */
		const CRUDupdate = await RetailStore.findByIdAndUpdate({_id: id}, {$set: options});

		/* Sending the response back to the server */
		res.status(200).send(CRUDupdate);
	}catch(err){
		/* Sending error back to the server */
		res.status(400).send(err);
	}
}

exports.getstoreDetail = async function(req, res) {
    try {
        const id = req.params.StoreId;
        const CRUDupdate = await RetailStore.find({_id: id});
        /* Sending the response back to the server */
            res.status(200).send(CRUDupdate);
	}catch(err){
		/* Sending error back to the server */
		res.status(400).send(err);
	}
}
exports.list = async function(req, res) {
    try {
        const CRUDupdate = await RetailStore.find();
        /* Sending the response back to the server */
            res.status(200).send(CRUDupdate);
	}catch(err){
		/* Sending error back to the server */
		res.status(400).send(err);
	}
}
