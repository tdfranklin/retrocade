const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//Initialize App
const app = express();

//Set port
const PORT = process.env.PORT || 5000;

//Database Connection
mongoose.connect('mongodb://localhost/retrocade', {
    useMongoClient: true
});
let db = mongoose.connection;

//Check DB connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//Check for DB errors
db.on('error', (err) => {
    console.log(err);
});

/*
Put this in another file?  Model folder?  Decide where to host Database info.

let mongoose = require('mongoose');
//Database Schema
let leaderboardSchema = mongoose.Schema({
    game: {
        type: String,
        required: true
    },
    initials: {
        type: String
    },
    score: {
        type: Number,
        required: true
    }
});

let Leaderboard = module.exports = mongoose.model('Leaderboard', leaderboardSchema);

*/

//Priority serve any static files
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

//Answer API requests.
app.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message": "Hello from Tyler\'s server!"}');
});

//All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

//Start Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});