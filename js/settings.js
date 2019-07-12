let 
	helpPanel   = document.getElementById('helpPanel'),
	loginForm 	= document.getElementById('login'),
	start 		= document.getElementById('start'),
	nickname 	= document.getElementById('nickname');


start.onclick = () => {
	if (nickname.value.length) {

		localStorage.setItem('nickname', nickname.value);

		engine.input.pause = true;

		login.className = 'rotate_right';
		login.setAttribute('disabled', '');

		helpPanel.className = 'rotate_left';

		start.setAttribute('disabled', '');
	}
}

let soundTrack = document.getElementById('soundTrack');
soundTrack.play();
soundTrack.volume = 0.8;
