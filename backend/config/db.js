const mongoose = require('mongoose');

const connectDB = () => {
    // MongoDB connection URI
    const URI = 'mongodb://localhost:27017/academyhub_db';

    // connection à mongoDB
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    }).catch(err => console.error(err));

    // Vérifier la connection
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Connexion à MongoDB établie avec succès');
    }).on('error', (error) => {
        console.error('MongoDB connection erreur :', error);
    });
}

module.exports = {connectDB};