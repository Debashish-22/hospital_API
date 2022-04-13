const express = require('express');
const app = express();
const port = 8000;
const router = require('./routes/index');
const db = require('./config/mongoose');
const passport =require('passport');
const pasportJWT = require('./config/passport-jwt-strategy');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use('/', router);

app.listen(port, (err)=>{
    if(err){
        console.log('Error in starting server!');
        return;
    }
    console.log(`Server listening on port : ${port}`);
});