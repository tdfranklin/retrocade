const mongoose = require('mongoose');
const Score = mongoose.model('Scores');

//Queries database for top 10 scores of game requested via headers
exports.top_10_scores = (req, res) => {
    Score.find({game: req.headers.game}).limit(10).sort({score: -1}).exec((err, score) => {
        if (err) {
            res.send(err);
        } else {
            res.json(score);
        }
    });
};

//Posts new score to database via headers
exports.new_score = (req, res) => {
    let new_score = new Score();
    new_score.game = req.headers.game;
    new_score.initials = req.headers.initials;
    new_score.score = req.headers.score;
    new_score.save((err, score) => {
        if (err) {
            res.send(err);
        } else {
            res.json(score);
        }
    });
};