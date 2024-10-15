const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },
});

module.exports = mongoose.model('Topic', TopicSchema);
