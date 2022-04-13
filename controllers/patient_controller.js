const Patient = require('../models/patient');
const Report = require('../models/report');

const register = async (req, res) =>{
    
    try{
        let patient;
        patient = await Patient.findOne({phone: req.body.phone});

        // If Patient found with given phone then no need to register
        if(patient){
            return res.json({
                message: "Patient with entered phone no. already exists!",
                info: patient
            })
        }

        // Patient phone should have length '10'
        if(req.body.phone.length !== 10){
            return res.json({
                message: "Phone No. should contain 10 digits"
            })
        }

        // Creating patient
        patient = await Patient.create(req.body);

        return res.json({
            message: "New Patient registered successfully!",
            info: patient
        })
    }
    catch(err){
        return res.json({
            message: "Error in registering patient!",
            error: err
        })
    }
}

const createReport = async(req, res) =>{

    try{
        let patient;
        patient = await Patient.findById(req.params.id);

        // Checking if patient exists or not
        if(!patient){
            return res.json({
                message:"Patient doesn't exist!"
            })
        }

        let status = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];

        // Checking if the provided 'status' valid or not
        if(!status.includes(req.body.status)){
            return res.json({
                message: "Please enter valid status.",
                valid_status: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']
            })
        }

        // Creating current time stamps
        let date = new Date();
        let currentDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;

        // Creating and returning patient report
        let report = await Report.create({
            patient_id: patient.id,
            createdBy: req.user.doctorName,
            status: req.body.status,
            date: currentDate
        })

        // Pushing the report into respective patient reports array and saving 
        patient.reports.push(report.id);
        patient.save();

        return res.json({
            message: "Report created successfully!",
            report: report
        })
    }
    catch(err){
        return res.json({
            message: "Error in creating patient report!",
            error: err
        })
    }
}

const allReports = async(req, res) =>{
    try{

        let patient = await Patient.findById(req.params.id);

        // Checking if patient exists or not
        if(!patient){
            return res.json({
                message:"Patient doesn't exist!"
            })
        }

        // Populating the reports of patient and sorting from oldest to newest.
        let populatedPatient = await patient.populate({
            path: 'reports',
            options: {sort: {'createdAt': 1}}
        });

        if(populatedPatient.reports.length === 0){
            return res.json({
                message: "Patient have no reports!"
            })
        }

        return res.json({
            message: "All the reports associated with the patient sorted by oldest to newest.",
            patientInfo: {
                 patientName: populatedPatient.patientName,
                 patientPhone: populatedPatient.phone
            },
            reports: populatedPatient.reports
        })
    }
    catch(err){
        console.log(err)
        return res.json({
            message: "Error in fetching all reports of the patient!",
            error: err
        })
    }
}

module.exports = { register, createReport, allReports }