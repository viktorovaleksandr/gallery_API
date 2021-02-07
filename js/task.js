function renderAlbums(todoTitle,id) {
	const ulTodo = document.querySelector('.js-list-todo');
	const list = document.createElement('li');
	list.className = `list-group-item list-group-item-action d-flex 
	justify-content-between`;

	list.dataset.id = id;
	list.textContent = todoTitle;
	ulTodo.append(list);
}
function eventClickAlbum(todo) {
	const ulTodo = document.querySelector('.js-list-todo');

  	ulTodo.addEventListener('click', (event) => {
		const album = event.target.closest('li');
		const albumId = album.dataset.id;
		// img.remove();
		getNewFetch(albumId);
	});	
}
eventClickAlbum()

function getNewFetch(albumId) {
	fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
	.then((response) => response.json())
	.then((todos) => {
		todos.map((todo,i) => {
			console.log(todo)
			renderPhoto(todo,i);
   	});
	})
}
function renderPhoto(todo,i) {
	const div = document.querySelector('.col-md-4');
	const img = document.createElement('img');

	if (i === 1) {
		img.src = todo.url;
   	img.width = 550;
   	img.height = 500;
   	div.append(img);
	}	
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
		todos.map((todo,i) => {
			renderPhoto(todo,i);
   	});
	})
	.catch((error) => console.log('Error'));

// 1) удолять предыдущее фото