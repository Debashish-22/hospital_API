const mongoose = require('mongoose');

// Report model will contain 'patient_id', 'created_By', 'date' AUTOFILLED
// while 'status' is provided by user 
const reportSchema = new mongoose.Schema({
    patient_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    createdBy:{
        type:String,
        required: true
    },
    status:{
        type: String,
        enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
        required: true
    },
    date:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;