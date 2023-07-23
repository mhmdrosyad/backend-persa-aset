const mongoose = require('mongoose');
const database = 'mongodb://0.0.0.0:27017/asetDB';

async function connectMongo() {
    await mongoose.connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = connectMongo;