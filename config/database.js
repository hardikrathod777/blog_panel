// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('MongoDB Connected');
//     } catch (err) {
//         console.error(err);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;



const mongoose = require('mongoose');
require('dotenv').config();  // Loads the environment variables from .env file into process.env

const connectDB = async () => {
    try {
        // Check if the URI exists in the environment variables
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MONGO_URI not found in .env');
        }

        // Connect to MongoDB using the URI from environment variables
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,    // Ensures that new MongoDB connection string parsers are used
            useUnifiedTopology: true  // Opt-in to the MongoDB driver's new connection management engine
        });
        console.log('MongoDB Connected successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1); // Terminate the process if connection fails
    }
};

module.exports = connectDB;
