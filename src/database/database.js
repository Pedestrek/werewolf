const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://0.0.0.0:27017/discordauth', 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
})