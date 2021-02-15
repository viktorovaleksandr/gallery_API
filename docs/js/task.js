class GalleryRequests {
	static sendGetAlbumsRequest() {
		return fetch('https://jsonplaceholder.typicode.com/albums').then((response) => response.json())
			
			.then((albums) => {
			albums.map((albumList,id) => {
	   		getAlbums(albumList,id);	
	   	});
		})
	}

	static sendGetFirstAlbumPhotosRequest() {
		return fetch('https://jsonplaceholder.typicode.com/photos?albumId=1').then((response) => response.json())
			
			.then((albums) => {
			renderPhotos(albums);
			return  getPhotos(event);
		})
	}

	static sendGetPhotosRequest(albumId) {
		return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`).then((response) => response.json())
	}
}

function getAlbums(albumList,albumId) {
	const albumElement = document.createElement('div');
	albumElement.className = `alert alert-warning`;
	albumElement.dataset.id = albumId + 1;
	albumElement.textContent = albumList.title;
	containerAlbums.append(albumElement);
}

function getPhotos(event) {
	const albumItem = event.target.closest('div');
	const albumId = albumItem.dataset.id;

	const promise = GalleryRequests.sendGetPhotosRequest(albumId);

	promise.then((albums) => {
		containerPhotos.innerHTML = '';		
		renderPhotos(albums);
	})
}

function renderPhotos(albums) {
	albums.map((image) => {
   	createImage(image);	
   });
}

const containerAlbums = document.querySelector('.js-list-albums');
const containerPhotos = document.querySelector('.js-gallery-photo');

init();

function	init() {
	GalleryRequests.sendGetAlbumsRequest();
	GalleryRequests.sendGetFirstAlbumPhotosRequest();
	createPhotosListener();
}

function createPhotosListener() {
  	containerAlbums.addEventListener('click', (event) => {
		getPhotos(event);
	});	
}

function createImage(image) {
	const img = document.createElement('img');
	img.src = image.url;
  	img.width = 550;
  	img.height = 150;
  	containerPhotos.append(img);
}


