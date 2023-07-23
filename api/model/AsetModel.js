const mongoose = require('mongoose');

const asetSchema = new mongoose.Schema({
    slug: String,
    nama: String,
    urlImg: String,
    stock: Number,
    note: String,
    price: String
});

const AsetModel = mongoose.model('Aset', asetSchema);

module.exports = AsetModel;