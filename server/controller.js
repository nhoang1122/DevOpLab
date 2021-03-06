const albums = require('./db.json');
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '1bd34d8fc4db4dc7ad17f2d7a8e3d496',
  captureUncaught: true,
  captureUnhandledRejections: true
});

let globalID = 5;

module.exports = {
    getAlbum: (req,res) => {
        res.status(200).send(albums);
    },
    deleteAlbum: (req,res) => {
        rollbar.info("DELETED ALBUM! It sucks.")
        let index = albums.findIndex((elem) => elem.id === +req.params.id)
        albums.splice(index,1);
        res.status(200).send(albums);
    },
    createAlbum: (req,res) => {
        rollbar.info("NEW MUSIC ALERT!! YEEE")
        let {title, artist, imageURL, ratings, faveTracks} = req.body;
        let newAlbum = {
            id:globalID,
            title: title,
            artist: artist,
            imageURL: imageURL,
            ratings: ratings,
            faveTracks: faveTracks
        };
        albums.push(newAlbum);
        globalID++
        res.status(200).send(albums)
    }
}