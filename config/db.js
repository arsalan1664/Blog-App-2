const mongoose = require('mongoose')
const colors = require('colors')


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log(`Conected to MongoDB ${
            mongoose.connection.host
        }`.bgMagenta.black);
    } catch (error) {
        console.log(`Error in Connection ${error}`.bgRed.black);
    }
}

module.exports = connectDB;
