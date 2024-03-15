const {check} = require('express-validator');

const idCheck = check('petName')
    .notEmpty().withMessage('Enter an ID')
    .isNumeric().withMessage('ID must be a number');

const petName = check('petName')
    .notEmpty()
    .withMessage('The name of the pet is mandatory.');

const animalSpecie = check('animalSpecie')
    .notEmpty()
    .withMessage('The animal specie is mandatory.');

const yearOfBirth =  check('yearOfBirth')
    .isNumeric()
    .withMessage('The year of birth must be a number. Enter the year in YYYY format.');

const neutered = check('neutered')
    .isBoolean().withMessage('The neuter status must be a boolean: "true" or "false".');
  
const ownerName =  check('owner.name')
    .notEmpty().withMessage("The owner's name is mandatory");

const ownerSurname = check('owner.surname')
    .notEmpty().withMessage("The ownwer's surname is mandatory");

const ownerphone = check('owner.phone')
    .notEmpty().withMessage("The owner's phone number is mandatory. It must be a reachable phone number in case of an emergency.")
    .isNumeric().withMessage('The phone number must be a number');

const ownerMail =  check('owner.mail')
    .optional()
    .isEmail().withMessage('Please enter a valid Email');

const anotherContactoName = check('owner.anotherContactPerson.name')
    .notEmpty().withMessage("Enter the name of another emergency contact person.");

const anotherContactophone = check('owner.anotherContactPerson.phone')
    .notEmpty()
    .withMessage("The contact phone is mandatory if unable to reach the registered owner.")
    .isNumeric().withMessage('The phone number must be a number');

const notesInfoDate = check('notesInfo.*.date')
    .optional().isISO8601()
    .withMessage("The date of the note must be in ISO8601 format - YYYY-MM-DD.");


module.exports = {
    idCheck,
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
}
