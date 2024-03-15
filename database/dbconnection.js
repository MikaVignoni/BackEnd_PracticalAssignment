const mongoose = require('mongoose');
require('dotenv').config();


const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL); 
        console.log('Successful connection to the database.')
    } catch (error){
        console.log('Error connecting to the database - ', error)
    }
}

module.exports = connect;
