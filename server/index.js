const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let Score = require('./models/score-model');
const routes = require('./routes/score-routes');

//const dbAddress = 'mongodb://localhost/retrocade';
const dbAddress = 'mongodb://heroku_mrlj3mkq:4h9rrdi3ip4s613pmsh11ovpbv@ds139884.mlab.com:39884/heroku_mrlj3mkq';

//Initialize App
const app = express();

//Set port
const PORT = process.env.PORT || 5000;

//Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(dbAddress, {
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

//Priority serve any static files
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
routes(app);
/*
//Answer API requests.
app.get('/api', (req, res) => {
    Score.find({}, (err, scores) => {
        if(err) {
            console.log(err);
        } else {
            //send scores
        }
    });
    res.set('Content-Type', 'application/json');
    res.send('{"message": "Hello from Tyler\'s server!"}');
});
*/
//All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

//Start Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});