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
			return getPhotos();
		})
	}

	static sendGetPhotosRequest(albumId) {
		return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`).then((response) => response.json())
	}
}

function getAlbums(albumList,albumId) {
	const divElement = document.createElement('div');
	divElement.className = `alert alert-warning`;
	divElement.dataset.id = albumId + 1;
	divElement.textContent = albumList.title;
	containerGalleryAlbums.append(divElement);
}

function getPhotos(event) {
	const albumItem = event.target.closest('div');
	const albumId = albumItem.dataset.id;

	const promise = GalleryRequests.sendGetPhotosRequest(albumId);

	promise.then((albums) => {
		containerGalleryPhotos.innerHTML = '';		
		renderPhotos(albums);
	})
}

function renderPhotos(albums) {
	albums.map((image) => {
   	createImage(image);	
   });
}

const containerGalleryAlbums = document.querySelector('.js-gallery-albums');
const containerGalleryPhotos = document.querySelector('.js-gallery-photo');

init();

function	init() {
	GalleryRequests.sendGetAlbumsRequest();
	GalleryRequests.sendGetFirstAlbumPhotosRequest();
	createPhotosListener();
}

function createPhotosListener() {
  	containerGalleryAlbums.addEventListener('click', (event) => {
		getPhotos(event);
	});	
}

function createImage(image) {
	const img = document.createElement('img');
	img.src = image.url;
  	img.width = 550;
  	img.height = 150;
  	containerGalleryPhotos.append(img);
}


