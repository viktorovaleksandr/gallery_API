const containerGalleryAlbums = document.querySelector('.js-gallery-albums');
const containerGalleryPhotos = document.querySelector('.js-gallery-photo');

// Request

function sendGetAlbumsRequest() {
	return fetch('https://jsonplaceholder.typicode.com/albums').then((response) => response.json())
		.then((albums) => {
			renderAlbums(albums);
	   	sendGetPhotosRequest(albums[0].id);
	})
}

function sendGetPhotosRequest(albumId) {
	return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`).then((response) => response.json())
	.then((albums) => {
		containerGalleryPhotos.innerHTML = '';		
		renderPhotos(albums);
	})
}

// RENDER 

function renderAlbums(albums) {
	albums.map((albumList,id) => {
	   const divElement = document.createElement('div');
		divElement.className = `alert alert-warning`;
		divElement.dataset.id = id + 1;
		divElement.textContent = albumList.title;
		containerGalleryAlbums.append(divElement);	
	});
}

function renderPhotos(albums) {
	albums.map((image) => {
   	const img = document.createElement('img');
		img.src = image.url;
  		img.width = 550;
  		img.height = 150;
  		containerGalleryPhotos.append(img);	
   });
}

// EVENT LISTENERS

function createPhotosEventListener() {
	containerGalleryAlbums.addEventListener('click', (event) => {
		const albumItem = event.target.closest('div');
		const albumId = albumItem.dataset.id;
		sendGetPhotosRequest(albumId);
	});	
}

// INIT 

init();

function	init() {
	sendGetAlbumsRequest();
	createPhotosEventListener();
}
