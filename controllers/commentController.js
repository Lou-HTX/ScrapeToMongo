'use strict';

const router = require('express').Router();
const Models = require('../models');

const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    addComment: (req, res) => {
        const newComment = new Models.Comment(req.body);

        newComment.save(function(error, doc) {
            if(error) {
                console.log(error);
            } else {
                Models.Article.findOneAndUpdate({ "_id": req.params.id},
            {$push:{'comment': doc._id}})
            .exec(function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('../../saved');
                }
            });
            }
        });
    },
    removeComment: (req, res) => {
        Models.Comment.remove({ '_id': req.params.id}, (error, doc) => res.redirect('../../saved'));
    },
};