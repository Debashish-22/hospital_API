const mongoose = require('mongoose');

// Patient model, 'phone' sholud be unique in entire collection also length is fixed i.e, '10'.
// Also it will contain an array of all the 'reports id' of the patient.
const patientSchema = new mongoose.Schema({
    patientName:{
        type:String,
        required: true
    },
    phone:{
        type: String,
        min: 10,
        max: 10,
        unique: true,
        required: true
    },
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report'
        }
    ]
},{
    timestamps: true
})

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;