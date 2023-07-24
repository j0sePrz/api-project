const mongoose = require('mongoose');

const PlaylistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tracks: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Playlists', PlaylistSchema);
