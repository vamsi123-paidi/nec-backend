const mongoose = require('mongoose')

const connectDB = () => {
    // Connect to MongoDB
    const MONGO_URI = process.env.MONGO_URL

    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
}

module.exports = connectDB