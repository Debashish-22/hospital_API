// Mongoose configuration

const env = require('../config/environment');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to Database"));

db.once('open', ()=>{
    console.log("Successfully connected to Database");
});