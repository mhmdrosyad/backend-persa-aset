const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    identitas: {
        type: String,
    },
    nomor: {
        type: String,
    },
    alamat: {
        type: String,
        required: true
    },
    wa: {
        type: String,
        required: true
    },
    aset: {
        type: String,
        required: true
    },
    jumlah: {
        type: Number,
        required: true
    },
    keperluan: {
        type: String,
        required: true
    },
    kenalan: {
        type: String,
    },
    tglPinjam: {
        type: String,
        required: true
    },
    tglKembali: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    done: {
        type: Boolean
    }
}, { collection: "rental" });

const RentModel = mongoose.model('Rent', rentSchema);

module.exports = RentModel;