const express = require('express');
const validate = require('../middlewares/validate');
const patientsController = require('../controllers/patients.controller');
const router = express.Router();
const { validationResult } = require('express-validator');
const addNoteRequest = require('../middlewares/addNoteRequest')

const {
    petName,
    animalSpecie,
    yearOfBirth,
    neutered,
    ownerName,
    ownerSurname,
    ownerphone,
    ownerMail,
    anotherContactoName,
    anotherContactophone,
    notesInfoDate
} = require('../utils/validation');

router.get('/randomFact', patientsController.getRandomFact);

router.get('/', patientsController.getPatients);

router.post('/',
    [petName, animalSpecie, yearOfBirth, neutered, ownerName, ownerSurname, ownerphone, ownerMail, anotherContactoName, anotherContactophone, notesInfoDate],
    validate,
    patientsController.createPatient);

router.get('/buscarID/:id', patientsController.getPatientById);

router.get('/buscarOwnerName/:ownerName', patientsController.getPatientByOwnerName);

router.get('/buscarOwnerSurname/:ownerSurname', patientsController.getPatientByOwnerSurname);

router.get('/buscarPetName/:petName', patientsController.getPatientByPetName);

router.delete('/deletePaciante/:patientId', patientsController.deletePatient);

router.put('/updateNeutered/:id',
    [neutered],
    validate,
    patientsController.updateNeuteredId);

router.post('/addNotes/:id', addNoteRequest,
    [notesInfoDate],
    validate,
    patientsController.addNotes);

module.exports = router;