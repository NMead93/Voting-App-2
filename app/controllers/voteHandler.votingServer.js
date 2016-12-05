'use strict';

function voteHandler(db) {
    
    var votes = db.collection('votes');
    
    this.getVotes = function (req, res) {
        
        var voteProjection = { '_id': false };
        
        votes.findOne({}, voteProjection, function(err, result) {
            if (err) throw err;
            
            if (result){
                res.json(result);
            } else {
                votes.insert({'option1': 0, 'option2': 0, 'option3': 0}, function(err) {
                    if (err) throw err;
                    votes.findOne({}, voteProjection, function(err, doc) {
                        if (err) throw err;
                        
                        res.json(doc);
                    })
                })
            }
        })
        
    };
    
    this.addVotes = function (req, res) {
        votes.findAndModify({}, { '_id': 1 }, { $inc: { 'option1': 1 } }, function(err, result) {
            if (err) throw err;
            
            res.json(result);
        });
            
    };
    
    this.resetVotes = function (req, res) {
        votes.update({}, { 'option1': 0, 'option2': 0, 'option3': 0}, function(err, result) {
            if (err) throw err;
            
            res.json(result);
        })
    }
}

module.exports = voteHandler;