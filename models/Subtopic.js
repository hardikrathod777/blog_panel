const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const SubTopicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',  // Reference to the User model
        required: true
    }
})

module.exports = mongoose.model('SubTopic', SubTopicSchema);