const mongoose = require('../../database/mongodb');

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hexadecimal: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6,
        unique: true
    },
    updatedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;