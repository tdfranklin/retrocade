module.exports = (app) => {
    const score = require('../controllers/score-controller');

    //GET and POST routes for API
    app.route('/api')
        .get(score.top_10_scores)
        .post(score.new_score);
};