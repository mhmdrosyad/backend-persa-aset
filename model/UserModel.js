const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
}, { collection: "users" });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;