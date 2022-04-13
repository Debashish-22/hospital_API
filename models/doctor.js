const mongoose = require('mongoose');

// Doctor model, 'doctorName' sholud be unique in entire collection.
const doctorSchema = new mongoose.Schema({
    doctorName:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;