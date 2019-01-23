const { 
    Router,
} = require('express');
const Tweets = require('../models/tweets');
const { HttpError } = require('http');


module.exports = Router()
//post a tweet
    .post('/', (req, res, next) => {
        const { tweet, handle } = req.body;
        Tweets.create({
            tweet, 
            handle
        }, 
        (err, createdTweet) => {
            if(err) {
                if(err.code === 'ENOENT') {
                    return next(new HttpError(400, 'Bad ID'));
                } else {
                    next(err);
                }
            }
            res.send(createdTweet);
        });
    })

//get a list of tweets
    .get('/', (req, res) => {
        Tweets.find((err, listOfTweets) => {
            res.send(listOfTweets);
        });
    })
// can update a tweet by id 
    .put('/:id', (req, res, next) => {
        Tweets.findByIdAndUpdate(req.params.id, req.body, (err, updatedTweet) =>{
            if(err) return next(err);
            res.send(updatedTweet);
        });
    })
//delete by id 
    .delete('/:id', (req, res, next) => {
        Tweets.findByIdAndDelete(req.params.id, (err, deletedStatus) => {
            if(err) return next(err);
            res.send(deletedStatus);
        });
    })
//gets a tweet by id
    .get('/:id', (req, res) => {
        res.end(req.params.id);
    });

