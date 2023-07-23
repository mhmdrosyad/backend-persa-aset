const mongoose = require('mongoose');
const database = 'mongodb+srv://rosyad:radongblas@aset-persa.w3ehc38.mongodb.net/?retryWrites=true&w=majority';

async function connectMongo() {
    await mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = connectMongo;