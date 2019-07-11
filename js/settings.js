let play 		= document.getElementById('play'),
	help  		= document.getElementById('help'),
	helpOn  	= document.getElementById('helpOn'),
	loginForm 	= document.getElementById('login'),
	start 		= document.getElementById('start'),
	cancel 		= document.getElementById('cancel'),
	nickname 	= document.getElementById('nickname');
	login 		= document.getElementById('login');

play.onclick = () => {
	loginForm.className = 'loginOn';
	play.className += ' out';
	help.className += ' out';
}

help.onclick = () => {
	helpOn.className = 'helpOn'
}

cancel.onclick = () => {
	helpOn.className = '';
}

start.onclick = () => {
	login.style.transform = 'origin(right centr)';
	login.style.transform = 'rotate(66deg)';
	if (nickname.value.length) {
		localStorage.setItem('nickname', nickname.value);
		window.location = './game.html';
	}
}

let soundTrack = document.getElementById('soundTrack');
soundTrack.play();
soundTrack.volume = 0.8;
