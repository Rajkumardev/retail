const express = require("express");
const router = express.Router();
const multer = require('multer');
const csvController = require('../controller/csv_controller');

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "--" + file.originalname);
	},
});

const upload = multer({ storage: fileStorageEngine });

router.post('/single', upload.single('fileUpload'), (req, res) => {
	console.log('single route')
	console.log('file:'+JSON.stringify(req.file));
	res.send("single file upload success");
});


router.post("/fileUpload", upload.single('fileCSV'),
	csvController.fileupload);

router.get("/liststore", csvController.list)
router.post("/updateStore/:StoreId", csvController.update)
router.get("/getstoreDetail/:StoreId", csvController.getstoreDetail)

module.exports = router;

