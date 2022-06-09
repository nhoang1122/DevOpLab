const express = require('express')
const cors = require("cors");
const path = require('path')

const app = express()
const controllerFile = require("./controller");

app.use(express.json());
app.use(cors());

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '1bd34d8fc4db4dc7ad17f2d7a8e3d496',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.get("/api/albums", controllerFile.getAlbum);
app.delete("/api/albums/:id", controllerFile.deleteAlbum);
app.post("/api/albums", controllerFile.createAlbum);


app.use(express.static('public'))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

const port = process.env.PORT || 9000

app.listen(port, () => console.log(`It's OVER ${port}`))