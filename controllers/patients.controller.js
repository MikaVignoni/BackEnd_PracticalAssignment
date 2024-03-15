const PatientsDB = require('../models/Patients')
const axios = require('axios')


const getRandomFact = async(req, res) =>{
    try {
        const {data} = await axios.get('https://catfact.ninja/fact');
        const fact = await data.fact
        res.status(200).json({randomFact: fact, msg:"OK"});
    } catch{
        res.status(502).json({msg: "Error connecting to the API."})
    }
}

const getPatients = async (req, res) => {
    try{
        const allPatientsInfo = await PatientsDB.find();
        res.status(200).json({patient: allPatientsInfo, msg: "ok"});
    } catch (error) { res.status(500).json({ patient: null, msg: "Error getting patient information - " + error.message,}) 
    }
};

const createPatient = async (req, res) => {
    try{
        const lastPatient = await PatientsDB.findOne({}, 'id', { sort: { 'id': -1 } });  
        const newId = lastPatient ? lastPatient.id + 1 : 1;
        const patientConNewId = {
            id: newId,
            ...req.body,
        };
        const newPatient = await PatientsDB.create(patientConNewId);
        res.status(201).json({ patient: newPatient, msg: "ok", newId }).send(`New patient created with ID: ${newId}`);
    } catch (error) { res.status(500).json({patient: null, msg: "Error registering the patient - " + error.message,});
    }
};

const getPatientById = async (req, res) => {
    try{
        const patient = await PatientsDB.findOne({ id: req.params.id });
        res.status(200).json({ patient: patient, msg: "ok"});
    } catch (error) { res.status(500).json({ patient: null, msg: "Error getting patient information - " + error.message });
    }
};

const getPatientByOwnerName = async (req, res) => {
    try{
        const patient = await PatientsDB.find({ 'owner.name': req.params.ownerName });
        res.status(200).json({ patient: patient, msg: "ok"});
    } catch (error) { res.status(500).json({ patient: null, msg: "Error getting the pets of that owner - " + error.message });
    }
};

const getPatientByOwnerSurname = async (req, res) => {
    try{
        const patient = await PatientsDB.find({ 'owner.surname': req.params.ownerSurname });
        res.status(200).json({ patient: patient, msg: "ok"});
    } catch (error) { res.status(500).json({ patient: null, msg: "Error getting the pets of that owner - " + error.message });
    }
};

const getPatientByPetName = async (req, res) => {
    try{
        const patient = await PatientsDB.find({ 'petName': req.params.petName});
        res.status(200).json({ patient: patient, msg: "ok"});
    } catch (error) { res.status(500).json({ patient: null, msg: "Error getting the info of that pet - " + error.message });
    }
};

const deletePatient = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patientExists = await PatientsDB.findOne({ id: patientId });

        if (patientExists) {
            await PatientsDB.findOneAndDelete({ id: patientId });
            res.status(200).json({ msg: "Patient deleted" });
        } else {
            res.status(404).json({ msg: "Patient no found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error deleting the patient - " + error.message });
    }
};

const updateNeuteredId = async (req, res) => {
    try{
        const patient = await PatientsDB.findOne({ id: req.params.id });
        const newNeuteredStatus = req.body.neutered;

        if (patient) {
            const patient = await PatientsDB.findOneAndUpdate( { id: req.params.id },
                { $set: { neutered: newNeuteredStatus } },
                { new: true }
            );
            res.status(200).json( {patient: patient.petName, msg: "Neutering situation updated" });

        } else {
            res.status(404).json({patient: null, msg: "Patient not found"});
        }
    } catch (error) {
        res.status(418).json({ msg: "Error updating - " + error.message});
    }
};

const addNotes = async (req, res) => { 
    try{
        const patient = await PatientsDB.findOne({ id: req.params.id });
        
        if (patient) {
            const newNote = {
                date: req.body.date,
                notes: req.body.notes
            };
            patient.notesInfo.push(newNote);
            const patientUpdate = await patient.save();
            res.status(200).json( {patient: patientUpdate, msg: "Medical History Updated" });
        } else {
            res.status(404).json({patient: null, msg: "Patient no found"});
        }
    } catch (error) { 
        res.status(500).json({patient: null, msg: "Error updating medical history- " + error.message});
    }
};

module.exports = {
    getRandomFact,
    getPatients, 
    createPatient, 
    getPatientById, 
    getPatientByOwnerName, 
    getPatientByOwnerSurname, 
    getPatientByPetName, 
    deletePatient, 
    updateNeuteredId, 
    addNotes
};