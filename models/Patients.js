const mongoose = require('mongoose');
const {Schema} = mongoose; 

const patientsSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    petName: {
        type: String,
        required: true
    },
    animalSpecie: { 
        type: String,
        required: true
    },

    yearOfBirth: Number, // if it is unknown it could be the estimated year of birth

    neutered: {
        type: Boolean,
        default: false 
    },

    owner:{
        name: {
            type: String,
            required: true
        },

        surname: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        mail: String,
        anotherContactPerson: {  //another person to contact in case of an emergency
            name: String,
            phone: Number,
        }
    },

    notesInfo: [{ // Medical History
        date: { // Date of the visit
            type: Date,
            default: Date.now
        },
        notes: { // Treatment / comments / interventions / future notes
            type: String
        }
    }]
    },

    { timestamps: true }
)

const Patients = mongoose.model('Patients', patientsSchema); 

module.exports = Patients;