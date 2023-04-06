const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));


dotenv.config();
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

/* Initializing the path for routes */
app.use("/", require("./routes"));

global.dbconn = "";

/* Connected the app with mongoose */
mongoose.connect(
	process.env.DB_CONNECT
);
/* Setting up server */
app.listen(process.env.PORT, function() {
	console.log("This server port is up and running " + process.env.PORT);
});
