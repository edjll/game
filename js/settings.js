let 
	helpPanel   = document.getElementById('helpPanel'),
	loginForm 	= document.getElementById('login'),
	start 		= document.getElementById('start'),
	nickname 	= document.getElementById('nickname'),
	end			= document.getElementById('end'),
	res_left	= document.createElement('div'),
	res_right 	= document.createElement('div');

res_left.setAttribute('id', 'res_left');
res_left.className = 'rotate_left';

res_right.setAttribute('id', 'res_right');
res_right.className = 'rotate_right';

start.onclick = () => {
	if (nickname.value.length) {

		localStorage.setItem('nickname', nickname.value);

		engine.player.input.pause = false;

		login.className = 'rotate_right';
		login.setAttribute('disabled', '');

		helpPanel.className = 'rotate_left';

		start.setAttribute('disabled', '');

		setTimeout(() => {
			login.remove();
			helpPanel.remove();

			document.body.insertBefore(res_right, document.body.firstChild);
			document.body.insertBefore(res_left, document.body.firstChild);
		}, 2000);
	}
}

let soundTrack = document.getElementById('soundTrack');
soundTrack.play();
soundTrack.volume = 0.8;

function sortLocalStorage() {
	if(localStorage.length > 0) {
        let localStorageArray = [];

        for (i = 0; i < localStorage.length; i++) {
        	if (!isNaN(Number(localStorage.getItem(localStorage.key(i))))) {
	        	localStorageArray.push({
	                key:    localStorage.key(i),
	                value: Number(localStorage.getItem(localStorage.key(i))),
	            });
        	}
        }

    	function sortArrayObject(a, b) {
        	if (a['value'] < b['value']) {
            	return 1;
        	}
        	if (a['value'] > b['value']) {
           	 	return -1;
        	}
    	}

   	 	return localStorageArray.sort(sortArrayObject);
   	}
}


function gameOver() {
	let player = localStorage.getItem('nickname');
	let flag = 0; 
	let point;
	let transition = 5;
	let array = sortLocalStorage(),
		amount  = 10;

	for (let i = 0; i < array.length; i++) {
		if (array[i]['key'] == player && i<10) {
			flag = 1;
			break;
		}
		if (array[i]['key'] == player) {
			point = i+1;
			break;
		}
	}

	if (!flag) {
		amount--;
		transition = 4;
	}

	for (let i = 0; i < array.length; i++) {
		if (amount == 0) { 
			break;
		}
		if (array[i]['key'] == player) {
			if (amount > transition){
				res_left.innerHTML += '<b>' + (i+1) + '. ' + array[i]['key'] + ': ' + array[i]['value'] + '</b>';
			} else {
				res_right.innerHTML += '<b>' + (i+1) + '. ' + array[i]['key'] + ': ' + array[i]['value'] + '</b>';
			}
			amount--;
			continue;
		}
		if (amount > transition) {
			res_left.innerHTML += '<span>' + (i+1) + '. ' + array[i]['key'] + ': ' + array[i]['value'] + '</span>';
		} else {
			res_right.innerHTML += '<span>' + (i+1) + '. ' + array[i]['key'] + ': ' + array[i]['value'] + '</span>';
		}
		amount--;
	}

	if (!flag) {
		res_right.innerHTML += '<b>' + point + '. ' + localStorage.getItem('nickname') + ': ' + localStorage.getItem(localStorage.getItem('nickname')) + '</b>';
	}

	res_left.className = '';
	res_right.className = '';
}