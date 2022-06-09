const albums = require('./db.json');

module.exports = {
    getAlbum: (req,res) => {
        res.status(200).send(albums);
    }
}