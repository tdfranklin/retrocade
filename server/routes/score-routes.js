module.exports = (app) => {
    const score = require('../controllers/score-controller');

    //score Routes
    app.route('/api')
        .get(score.top_10_scores)
        .post(score.new_score);
};