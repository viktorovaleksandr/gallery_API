function renderAlbums(todoTitle,id) {
	const ulTodo = document.querySelector('.js-list-todo');
	const list = document.createElement('div');
	list.className = `alert alert-dark d-flex 
	justify-content-between`;

	list.dataset.id = id;
	list.textContent = todoTitle;
	ulTodo.append(list);
}
function eventClickAlbum(todo) {
	const ulTodo = document.querySelector('.js-list-todo');

  	ulTodo.addEventListener('click', (event) => {
		const album = event.target.closest('div');
		const albumId = album.dataset.id;

		getNewFetch(albumId);
	});	
}
function getNewFetch(albumId) {
	fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
	.then((response) => response.json())
	.then((todos) => {
		todos.map((todo) => {
			renderPhotos(todo);
   	});
	})
}
eventClickAlbum();

function renderPhotos(todo) {
	const div = document.querySelector('.col-md-4');
	const img = document.createElement('img');

	img.src = todo.url;
   img.width = 550;
   img.height = 150;
   div.append(img);
}
fetch('https://jsonplaceholder.typicode.com/albums')

	.then((response) => response.json())
	.then((user) => {
		user.map((todo,id) => {
   		renderAlbums(todo.title,id);	
   	});
   	return fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
	})
	.then((response) => response.json())
	.then((todos) => {
		todos.map((todo) => {
			renderPhotos(todo);
   	});
	})
	.catch((error) => console.log('Error'));

// 1) удолять предыдущие фото
	// img.remove();