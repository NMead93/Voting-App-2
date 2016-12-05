'use strict';

var VoteHandler = require('/home/ubuntu/workspace/app/controllers/voteHandler.votingServer.js');

module.exports = function (app, db) {
    
    var voteHandler = new VoteHandler(db);

    app.route('/')
        .get(function (req, res) {
            res.sendFile('/home/ubuntu/workspace/public/votingIndex.html');
        });
        
    app.route('/api/votes')
        .get(voteHandler.getVotes)
        .post(voteHandler.addVotes)
        .delete(voteHandler.resetVotes);
};