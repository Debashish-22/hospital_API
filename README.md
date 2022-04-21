# hospital_API
> It's an API for the doctors of a Hospital which can be used for testing and quarantine + well being of COVID-19 patients.

## Demonstartion

> [Demonstration video link]()

## Tech-Stack
* [NodeJS](https://nodejs.org/en/) and [ExpressJS](https://expressjs.com/) (for backend server).
* [MongoDB](https://www.mongodb.com/) ( as database to store data).
* [Passport.js](https://www.passportjs.org/) and [jwt.io](https://jwt.io/) (for authentication and authorization).
* [bcrypt](https://www.npmjs.com/package/bcrypt) (for password hashing).

## Installation Guide

Install [NodeJS](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) on your system.

Install or open [Postman](https://www.postman.com/).

on terminal write:

```
npm install 
npm start
```

Open Postman application to test below routes...

## API References
    
| Reference                  | Method | Purpose                                                                | Protected |
| ---------------------------|:------:| -----------------------------------------------------------------------| :--------:|
| /doctors/register          | POST   | register new doctor with `doctorName` and `password`                   | No        |
| /doctors/login             | POST   | login with `doctorName` and `password` returns a JWT token             | No        |
| /patients/register         | POST   | register new patient with `patientName` and `phone`                    | Yes       |
| /patients/:id/create_report| POST   | create report of patient with `status`                                 | Yes       |
| /patients/:id/all_reports  | GET    | List all the reports of a patient oldest to latest                     | Yes       |
| /reports/:status           | GET    | List all the reports of all the patients filtered by a specific status | Yes       |

### Notes and Examples
*  `report` will have following fields: "patient_id", "createdBy", "status", "date".
*  `status` can be either of : ["Negative", "Travelled-Quarantine", "Symptoms-Quarantine", "Positive-Admit"].
*  `/patients/:id/create_report` we have to provide only `status`, rest fields will be automatically filled.
*  Testing `/patients/:id/create_report` and creating `patient_report` using [postman](https://www.postman.com/):- 

   ```
   Route:- localhost:8000/patients/625300be52bf3e46f5501bd3/create_report
   
   Body > raw:-
   {
   "status": "Positive-Admit"
   }
   
   output:-
   {
    "message": "Report created successfully!",
    "report": {
        "patient_id": "625300be52bf3e46f5501bd3",
        "createdBy": "debashish",
        "status": "Positive-Admit",
        "date": "10-4-2022",
        "_id": "625300ea52bf3e46f5501bd7",
        "createdAt": "2022-04-10T16:08:10.821Z",
        "updatedAt": "2022-04-10T16:08:10.821Z",
        "__v": 0
     }
   }
   ```
* For detailed routes testing follow [video link]().

## Folder Structure
* `app.js` - Entry point of our application. This file defines our express server.
* `config` - This folder contains configuration of [Mongoose](https://mongoosejs.com/)(schema and model), [passport-jwt](http://www.passportjs.org/packages/passport-jwt/) (for jwt authentication).
* `controllers` - This folder contains various functions to be executed when called through routes.
* `models` - This folder contains schema definition of our mongoose models.
* `routes` - This folder contains all the routes for our API.
