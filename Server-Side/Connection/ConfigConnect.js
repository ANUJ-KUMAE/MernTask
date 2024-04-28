const mongoose = require('mongoose');

const URL = process.env.CONNECTION_URL;

const connectDB = async() => {
    try {
        await mongoose.connect(URL);
        console.log("Databse Connected Successfully");
    } catch (error) {
        console.log("Databse Connection Failed");
        process.exit(0);
    }
}

module.exports = connectDB;