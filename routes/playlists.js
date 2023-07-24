const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {

    try {
        const playlists = await Playlist.find();
        res.json(playlists);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const playlist = new Playlist({
        name: req.body.name,
        description: req.body.description,
        tracks: req.body.tracks
    });

    try {
        const savedPlaylist = await playlist.save();
        res.json(savedPlaylist);
    } catch (err) {
        res.json({ message: err });
    }
});

router.patch('/:playlistId', authenticateToken, async (req, res) => {
    try {
        const updatedPlaylist = await Playlist.updateOne(
            { _id: req.params.playlistId },
            { $set: { name: req.body.name, description: req.body.description, tracks: req.body.tracks } }
        );

        if (updatedPlaylist.nModified == 0) {
            console.log(`No playlist was updated. Check if the provided id exists and matches a playlist.`);
        } else {
            console.log(`Updated playlist with id: ${req.params.playlistId}`);
        }

        res.json(updatedPlaylist);
    } catch (err) {
        console.log('Error while updating:', err);
        res.json({ message: err });
    }
});


router.delete('/:playlistId', authenticateToken, async (req, res) => {
    try {
        const removedPlaylist = await Playlist.remove({ _id: req.params.playlistId });
        res.json(removedPlaylist);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
