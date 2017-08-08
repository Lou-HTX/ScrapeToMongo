const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
    "Comment",
    new Schema({
        comment: {
            type: String,
            required: ['Input a comment.']
        }
    })
);