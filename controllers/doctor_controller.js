// Password hashing library
const bcrypt = require('bcrypt');
// JWT token library
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');
const env = require('../config/environment');

const register = async (req, res) =>{
    
    try{

        let doctor;
        doctor = await Doctor.findOne({doctorName: req.body.doctorName});
    
        // if doctor found then no need to register
        if(doctor){  
            return res.json({
                message: "Doctor with username exists...please sign in or register with other username."
            })
        }

        // if not found
        // Hashing the password and creating new Doctor
        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        doctor = await Doctor.create({
            doctorName: req.body.doctorName,
            password: hashedPassword
        })

        return res.json({
            message: "New Doctor successfully registered!",
            info: doctor
        })

    }
    catch(err){
        return res.json({
            message: 'Something went wrong!',
            error: err
        })
    }
}

const login = async(req, res) =>{
    try{

        let doctor;
        doctor = await Doctor.findOne({doctorName: req.body.doctorName});
      
        // If no doctor found with the provided credentials then return.
        if(!doctor){
            return res.json({
                message: "Invalid Doctor name or password"
            })
        }

        // If doctor found compare the hashed pasword with the user given password
        let passwordCheck = await bcrypt.compare(req.body.password, doctor.password);
        
        if(!passwordCheck){
            return res.json({
                message: "Invalid Doctor name or password"
            })
        }
    
        // For valid doctor create and return JWT token that expires in '2 hours'.
        let token = jwt.sign({id : doctor.id}, env.jwt_secret, {expiresIn: '2h'});

        return res.json({
            message: "You successfully logged in!",
            token : `Bearer ${token}`
        })
    }
    catch(err){
        return res.json({
            message: 'Something went wrong!',
            error: err
        })
    }
}

module.exports = { register, login }