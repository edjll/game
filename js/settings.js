let play 		= document.getElementById('play'),
	help  		= document.getElementById('help'),
	helpO  	= document.getElementById('helpOff'),
	loginForm 	= document.getElementById('login'),
	start 		= document.getElementById('start'),
	cancel 		= document.getElementById('cancel'),
	nickname 	= document.getElementById('nickname');
	login 		= document.getElementById('login');
	main		= document.getElementById('main');
	flag		= 0;

play.onclick = () => {
	if (flag == -1) {
		play.className = 'container_button';
		help.className = 'container_button';
		helpO.id = 'helpOff';
	}
	flag = 1;
	loginForm.id = 'loginOn';
	play.className += ' left_out';
	help.className += ' left_out';
}

help.onclick = () => {
	if (flag == 1) {
		loginForm.id = 'login';
		play.className = 'container_button';
		help.className = 'container_button';
	}
	flag = -1;
	helpO.id = 'helpOn'
	play.className += ' right_out';
	help.className += ' right_out';
}

cancel.onclick = () => {
	flag == 0;
	play.className = 'container_button';
	help.className = 'container_button';
	helpO.id = 'helpOff';
}

start.onclick = () => {
	login.className += ' rotate_right';
	main.className += ' rotate_left'	
	if (nickname.value.length) {
		localStorage.setItem('nickname', nickname.value);
		window.location = './game.html';
	}
}

let soundTrack = document.getElementById('soundTrack');
soundTrack.play();
soundTrack.volume = 0.8;
