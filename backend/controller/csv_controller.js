
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
			csvData.push({
                storeId: data[0],
				sku: data[1],
				product_name: data[2],
				price: data[3]
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
				const getStoreList = await RetailStore.find().sort({ updated: -1 });
				console.log("CRUD Insert Many" + CRUDinsert)
				res.status(200).send(getStoreList);

			} catch(err){
				console.log("db error:" + err);
				res.status(400).send(err);
			}
			console.log(JSON.stringify(csvData));

		});

	stream.pipe(csvStream);
}

exports.update = async function(req, res) {
	/* Taking the id */
	const id = req.params.StoreId;
    const options = req.body;

	try{
		/* Using findByIdAndUpdate */
		await RetailStore.findByIdAndUpdate({_id: id}, {$set: options});
		const Storeupdate = await RetailStore.find({_id: id});

		/* Sending the response back to the server */
		res.status(200).send(Storeupdate);
	}catch(err){
		/* Sending error back to the server */
		res.status(400).send(err);
	}
}

exports.getstoreDetail = async function(req, res) {
    try {
        const id = req.params.StoreId;
        const getstoreDetail = await RetailStore.find({_id: id});
        /* Sending the response back to the server */
            res.status(200).send(getstoreDetail);
	} catch(err){
		/* Sending error back to the server */
		res.status(400).send(err);
	}
}

exports.list = async function(req, res) {
    try {
        const getStoreList = await RetailStore.find().sort({ updated: -1 });
        /* Sending the response back to the server */
            res.status(200).send(getStoreList);
	}catch(err){
		/* Sending error back to the server */
		res.status(400).send(err);
	}
}

/* Helper function to Search */
exports.searchStore = async function(req, res) {
    try {
		const seactTxt = req.body.searchText;
		let text=null;
			if(seactTxt) {
				text = {$text: {$search: `"\"${seactTxt}"\"`}};
			}
		const searchResult = await RetailStore.find(text);

        /* Sending the response back to the server */
		res.status(200).send(searchResult);
	}catch(err){
		/* Sending error back to the server */
		res.status(400).send(err);
	}
}
