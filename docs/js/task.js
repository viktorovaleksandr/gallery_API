const ulTodo = document.querySelector('.js-list-albums');
const wrapper = document.querySelector('.js-gallery-photo');

// Event Listener
function onClickAlbumsItem() {
  	ulTodo.addEventListener('click', (event) => {
		const albumItem = event.target.closest('div');
		const albumId = albumItem.dataset.id;

		sendGetPhotosRequest(albumId);
	});	
}
onClickAlbumsItem();

// Render 
function renderAlbums(title,id) {
	const albumLists = document.createElement('div');
	albumLists.className = `alert alert-warning`;
	albumLists.dataset.id = id + 1;
	albumLists.textContent = title;
	ulTodo.append(albumLists);
}
function renderPhotos(photo) {
	const img = document.createElement('img');
	img.src = photo.url;
  	img.width = 550;
  	img.height = 150;
  	wrapper.append(img);
}

// Request
function sendGetPhotosRequest(albumId) {
	fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
	.then((response) => response.json())
	.then((todos) => {
		wrapper.innerHTML = '';		
		todos.map((photo) => {
			renderPhotos(photo);
   	});
	})
	.catch((error) => console.error('Ошибка:', error));
}
function sendGetAlbumsRequest() {
	return fetch('https://jsonplaceholder.typicode.com/albums')
		.then((response) => response.json())
		.then((albums) => {
		albums.map((item,id) => {
   		renderAlbums(item.title,id);	
   	});
	})
	.catch((error) => console.error('Ошибка:', error));
}
sendGetAlbumsRequest();

function sendGetPhotoRequest() {
	return fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
		.then((response) => response.json())
		.then((albums) => {
		albums.map((albumItem) => {
			renderPhotos(albumItem);
   	});
	})
	.catch((error) => console.error('Ошибка:', error));
}
sendGetPhotoRequest()