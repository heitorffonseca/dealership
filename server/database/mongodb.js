const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/dealership', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.error(err));
mongoose['Promise'] = global.Promise;

module.exports = mongoose;