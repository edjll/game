let play 		= document.getElementById('play'),
	help  		= document.getElementById('help'),
	helpOn  	= document.getElementById('helpOn'),
	loginForm 	= document.getElementById('login'),
	start 		= document.getElementById('start'),
	cancel 		= document.getElementById('cancel'),
	nickname 	= document.getElementById('nickname');

play.onclick = () => {
	loginForm.className = 'loginOn';
	play.className += ' out';
	help.className += ' out';
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
help.onclick = () => {
	helpOn.className = 'helpOn'
	play.className += ' out';
	help.className += ' out';
}