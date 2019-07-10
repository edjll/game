let play 		= document.getElementById('play'),
	help  		= document.getElementById('help'),
	helpOn  	= document.getElementById('helpOn'),
	loginForm 	= document.getElementById('login'),
	start 		= document.getElementById('start'),
	cancel_1 	= document.getElementById('cancel_1'),
	cancel_2 	= document.getElementById('cancel_2'),
	nickname 	= document.getElementById('nickname');

play.onclick = () => {
	loginForm.className = 'loginOn';
	play.className += ' out';
	help.className += ' out';
}

help.onclick = () => {
	helpOn.className = 'helpOn'
	play.className += ' out';
	help.className += ' out';
}

cancel_1.onclick = () => {
	helpOn.className = '';
	play.className = 'container_button';
	help.className = 'container_button';
}

cancel_2.onclick = () => {
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

let soundTrack = document.getElementById('soundTrack');
soundTrack.play();
soundTrack.volume = 0.8;
