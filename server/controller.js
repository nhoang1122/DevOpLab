const albums = require('./db.json');

module.exports = {
    getAlbum: (req,res) => {
        res.status(200).send(albums);
    },
    deleteAlbum: (req,res) => {
        rollbar.info("DELETED ALBUM! It sucks.")
        let index = albums.findIndex((elem) => elem.id === +req.params.id)
        albums.splice(index,1);
        res.status(200).send(albums);
    }
}