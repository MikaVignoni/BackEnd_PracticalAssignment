const express = require('express');
const app = require ('./app');

const port = 8080;

app.listen(port, ()=>{ 
    console.log(`servidor en http://localhost:${port}`);

    console.log(`\n What can you do?? \n`);
    console.log(`http://localhost:${port}/veterinaryClinic/randomFact/ Get a random cat fact`);
    console.log(`http://localhost:${port}/veterinaryClinic/ Retrieve information for all patients.`);
    console.log(`http://localhost:${port}/veterinaryClinic/ add a new patient`);
    console.log(`http://localhost:${port}/veterinaryClinic/buscarID/:id  Search for a patient by ID`);
    console.log(`http://localhost:${port}/veterinaryClinic/buscarOwnerName/:ownerName  Search for a patient by the owner's name`);
    console.log(`http://localhost:${port}/veterinaryClinic/buscarOwnerName/:ownerSurname  Search for a patient by the owner's surname`);
    console.log(`http://localhost:${port}/veterinaryClinic/buscarPetName/:petName  Search for a patient by the pet's name`);
    console.log(`http://localhost:${port}/veterinaryClinic/deletePaciante/:patientId delete patient by ID`);
    console.log(`http://localhost:${port}/veterinaryClinic/updateNeutered/:id Update pet's neuter status, provide the pet's ID`);
    console.log(`http://localhost:${port}/veterinaryClinic/addNotes/:id  Add information to the medical history of the pet. Identify the pet by providing its ID.`);

});