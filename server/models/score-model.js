const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Scores Schema
let scoreSchema = new Schema({
    game: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    initials: {
        type: String
    },
    score: {
        type: Number,
        required: true
    }    
});

module.exports = mongoose.model('Scores', scoreSchema);