let 
	helpPanel   = document.getElementById('helpPanel'),
	loginForm 	= document.getElementById('login'),
	start 		= document.getElementById('start'),
	nickname 	= document.getElementById('nickname'),
	end			= document.getElementById('end'),
	resLeft		= document.createElement('div'),
	resRight 	= document.createElement('div'),
	textLeft	= document.createElement('p'),
	textRight 	= document.createElement('p');

resLeft.setAttribute('id', 'resLeft');
resLeft.className 	= 'rotateLeft';
textLeft.className 	= 'textLeft';

resRight.setAttribute('id', 'resRight');
resRight.className 	= 'rotateRight';

start.onclick = () => {
	localStorage.setItem('nickname', nickname.value);

	engine.player.input.pause = false;

	login.className = 'rotateRight';
	login.setAttribute('disabled', '');

	helpPanel.className = 'rotateLeft';

	start.setAttribute('disabled', '');

	setTimeout(() => {
		login.remove();
		helpPanel.remove();

		document.body.insertBefore(resRight, document.body.firstChild);
		document.body.insertBefore(resLeft,  document.body.firstChild);
	}, 2000);
}

nickname.oninput = () => {
	if (nickname.value.length) {
		if (start.hasAttribute('disabled')) {
			start.removeAttribute('disabled');
		}
	} else if (!start.hasAttribute('disabled')) {
		start.setAttribute('disabled', '');
	}
}

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
	let 
		player 		= localStorage.getItem('nickname'),
		flag 		= 0, 
		transition 	= 5,
		array 		= sortLocalStorage(),
		amount  	= 10,
		point;

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
				resLeft.innerHTML += '<b>' + (i+1) + '. ' + array[i]['key'] + ': ' + array[i]['value'] + '</b>';
			} else {
				resRight.innerHTML += '<b>' + (i+1) + '. ' + array[i]['key'] + ': ' + array[i]['value'] + '</b>';
			}
			amount--;
			continue;
		}
		if (amount > transition) {
			resLeft.innerHTML += '<span>' + (i+1) + '. ' + array[i]['key'] + ': ' + array[i]['value'] + '</span>';
		} else {
			resRight.innerHTML += '<span>' + (i+1) + '. ' + array[i]['key'] + ': ' + array[i]['value'] + '</span>';
		}
		amount--;
	}

	if (!flag) {
		resRight.innerHTML += '<b>' + point + '. ' + localStorage.getItem('nickname') + ': ' + localStorage.getItem(localStorage.getItem('nickname')) + '</b>';
	}

	textLeft.innerHTML 	= 'Score:';
	resLeft.appendChild(textLeft);

	textRight.innerHTML = localStorage.getItem('score');
	resRight.appendChild(textRight);

	resLeft.className 	= '';
	resRight.className 	= '';
}