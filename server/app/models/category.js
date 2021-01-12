const mongoose = require('../../database/mongodb');


const categorySchema = new mongoose.Schema({
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

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;