function sendGetPhotosRequest(albumId) {
	return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`).then((response) => response.json())
}

function sendGetAlbumsRequest() {

	return fetch('https://jsonplaceholder.typicode.com/albums').then((response) => response.json())
		.then((albums) => {
		albums.map((item,id) => {
   		getAlbums(item.title,id);	
   	});
	})
}

function sendGetFirstAlbumPhotosRequest() {

	return fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
		.then((response) => response.json())
		.then((albums) => {
		renderPhotos(albums);
	})
}

function getPhotos(event) {
	const albumItem = event.target.closest('div');
	const albumId = albumItem.dataset.id;

	const promise = sendGetPhotosRequest(albumId);

	promise.then((albums) => {
		containerPhotos.innerHTML = '';		
		renderPhotos(albums);
	})
}

function getAlbums(title,id) {
	const albumItem = document.createElement('div');
	albumItem.className = `alert alert-warning`;
	albumItem.dataset.id = id + 1;
	albumItem.textContent = title;
	containerAlbums.append(albumItem);
}

function createImage(photo) {
	const img = document.createElement('img');
	img.src = photo.url;
  	img.width = 550;
  	img.height = 150;
  	containerPhotos.append(img);
}

const containerAlbums = document.querySelector('.js-list-albums');
const containerPhotos = document.querySelector('.js-gallery-photo');

init();

function	init() {
	sendGetAlbumsRequest();
	sendGetFirstAlbumPhotosRequest();
	createAlbumPhotosListener();
}

function createAlbumPhotosListener() {
  	containerAlbums.addEventListener('click', (event) => {
		getPhotos(event);
	});	
}

function renderPhotos(albums) {
	albums.map((img) => {
   	createImage(img);	
   });
}


