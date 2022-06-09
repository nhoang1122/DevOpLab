const albumContainer = document.querySelector('#album-container');
const form = document.querySelector('form');

const url = `http://localhost:9000/api/albums`;

const getAllAlbums = () => {
    axios
    .get(url)
    .then(({data: albums}) => displayAlbums(albums))
    .catch((err) => {
        console.log(err)
    })
}

const createAlbum = (body) => {
    axios
    .post(url, body)
    .then(({data:albums}) => displayAlbums(albums))
    .catch((err) => {
        console.log(err)
    })
}

const deleteAlbum = id => {
    axios
    .delete(`${url}/${id}`)
    .then(({ data: albums }) => displayAlbums(albums))
    .catch((err) => {
        console.log(err.response.data)
    })
}

const submitHandler = (evt) => {
    evt.preventDefault()
    
    let title = document.querySelector('#title')
    let artist = document.querySelector('#artist')
    let imageURL = document.querySelector('#img')
    let faveTrack = document.querySelector('#fave-track')
    
    let rating = document.querySelector('input[name="ratings"]:checked')
    
    let bodyObj = {
        title : title.value,
        artist : artist.value,
        imageURL : imageURL.value,
        faveTrack : faveTrack.value,
        rating: rating.value
    }
    
    createAlbum(bodyObj)
    
    title.value = ''
    artist.value = ''
    imageURL.value = ''
    faveTrack.value = ''
    rating.checked = false;
    
}
    
    
const createAlbumCard = (album) => {
        const albumCard = document.createElement('div');
        albumCard.classList.add('album-card');
    
        albumCard.innerHTML = `<img alt='album cover' src=${album.imageURL} class='album-cover'/>
        <p class='album-title'>${album.title}</p>
        <p class='artist-name'>by ${album.artist}</p>
        <p class='track-title'>Fave Songs : ${album.faveTracks}</p>
        <section class='btns-container'>
            <button onclick=updateAlbum(${album.id}, 'minus')>-</button>
            <p class='album-rating'>${album.ratings} STARS</p>
            <button onclick=updateAlbum(${album.id}, 'plus')>+</button>
        </section> 
        <button onclick='deleteAlbum(${album.id})'>DELETE</button>`
    
        albumContainer.appendChild(albumCard);
        // <p class='album-rating>${album.ratings} STARS</p>
}
    
const displayAlbums = (arr) => {
        albumContainer.innerHTML = ``
        for (let i = 0; i < arr.length; i++) {
            createAlbumCard(arr[i])
        }
}
    
getAllAlbums();