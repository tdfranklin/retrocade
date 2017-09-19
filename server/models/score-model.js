const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Database Schema to create model
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