//Why do we require these two lines and what are they
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit();
    }
};

module.exports = connectDB;