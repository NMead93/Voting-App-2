'use strict';

var express = require('express'),
    routes = require('/home/ubuntu/workspace/app/routes/votingIndex.js');
var mongo = require('mongodb').MongoClient;

var bodyParser = require('body-parser'); 
    
var app = express();

app.use(bodyParser.json()); // to support JSON bodies

app.use('/controllers', express.static('/home/ubuntu/workspace/app/controllers'));
app.use('/public', express.static('/home/ubuntu/workspace/public'));

app.use(bodyParser.urlencoded({ extended: true }));

mongo.connect('mongodb://localhost:27017/votingAppjs', function (err, db) {
    
    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }
    
    routes(app, db);

    app.listen(8080, function () {
        console.log('Listening on port 8080...');
    });
});