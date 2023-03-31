// install mongoose
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
//using esmodules : first change in package.json type:module but i am using commonjsmodules

// after 6.0 version mongoose.connect use async/await and promise instead of accept callback funtion as a parameter
async function connectToMongo() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB database successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}
module.exports = connectToMongo

