let play 		= document.getElementById('play'),
	help  		= document.getElementById('help'),
	helpPanel   = document.getElementById('helpPanel'),
	loginForm 	= document.getElementById('login'),
	start 		= document.getElementById('start'),
	cancel 		= document.getElementById('cancel'),
	nickname 	= document.getElementById('nickname'),
	main		= document.getElementById('main'),
	background 	= document.getElementById('background');


play.onclick = () => {
	if (!main.className.length) {
		main.className = 'playOn';
		loginForm.className = 'loginOn';
		setTimeout(() => {
			main.className += ' background_left';
			loginForm.className += ' background_right';
		}, 1000);
	}
}

help.onclick = () => {
	if (!helpPanel.className.length) {
		helpPanel.className = 'helpOn';
	}
}

cancel.onclick = () => {
	helpPanel.className = '';
}

start.onclick = () => {
	background.className = 'backgroundOff';
	login.className += ' rotate_right';
	login.setAttribute('disabled', '');
	main.className += ' rotate_left';
	main.setAttribute('disabled', '');
	start.setAttribute('disabled', '');
	help.setAttribute('disabled', '');
	if (nickname.value.length) {
		localStorage.setItem('nickname', nickname.value);
		engine.input.pause = true;
	}
}

let soundTrack = document.getElementById('soundTrack');
soundTrack.play();
soundTrack.volume = 0.8;
