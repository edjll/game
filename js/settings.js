let play 		= document.getElementById('play'),
	loginForm 	= document.getElementById('login'),
	start 		= document.getElementById('start'),
	cancel 		= document.getElementById('cancel'),
	nickname 	= document.getElementById('nickname');

play.onclick = () => {
	loginForm.className = 'loginOn';
	play.className = ' out';
	help.className = ' out';
}

cancel.onclick = () => {
	loginForm.className = '';
	play.className = 'container_button';
	help.className = 'container_button';
}

start.onclick = () => {
	if (nickname.value.length) {
		localStorage.setItem('nickname', nickname.value);
		window.location = './game.html';
	}
}