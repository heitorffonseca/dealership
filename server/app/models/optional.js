const mongoose = require('../../database/mongodb');

const optionalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    updatedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Optional = mongoose.model('Optional', optionalSchema);

module.exports = Optional;