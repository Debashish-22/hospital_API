const Report = require('../models/report');

const status = async(req, res)=>{
    try{

        let status = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];

        // Checking if provided status valid or not
        if(!status.includes(req.params.status)){
            return res.json({
                message: "Please enter correct status.",
                valid_status: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']
            })
        }

        let reports = await Report.find({status: req.params.status});

        return res.json({
            message: `Reports with status: ${req.params.status}, Total_reports:${reports.length}`,
            reports: reports
        })
    }
    catch(err){
        return res.json({
            message: "Error in sorting reports",
            error: err
        })
    }
}

module.exports = { status }