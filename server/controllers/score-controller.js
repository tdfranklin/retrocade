const mongoose = require('mongoose');
const Score = mongoose.model('Scores');

exports.top_10_scores = (req, res) => {
    Score.find({game: req.headers.game}).limit(10).sort({score: -1}).exec((err, score) => {
        if (err) {
            res.send(err);
        } else {
            res.json(score);
        }
    });
};

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



/*
exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
*/