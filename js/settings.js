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

		engine.input.pause = true;

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

/*if (!this.game) {
	end.id += 'on';
	function sortLocalStorage(){
    if(localStorage.length > 0){
          var localStorageArray = [];
          for (i = 0; i < localStorage.length; i++){
              localStorageArray[i] = {
                  key:    localStorage.key(i),
                  value: localStorage.getItem(localStorage.key(i)),
              	}
        	}
    	}

    	function sortArrayObject(a, b) {
        	if (a['key'] > b['key']) {
            	return 1;
        	}
        	if (a['key'] < b['key']) {
           	 	return -1;
        	}
    	}

   	 	sortLocalStorageArray = localStorageArray.sort(sortArrayObject);

   	 	for (i = 0; i<localStorage.length || i<10; i++){
    		key = localStorage.key(i);
    		document.getElementsByClassName('res')[0].innerHTML += key + mass_elemets[i];
		}
	}

}*/


function sortLocalStorage() {
	if(localStorage.length > 0) {
        let localStorageArray 	  = [];

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
	res_left.innerHTML = '<p>' + localStorage.getItem('nickname') + ': ' + localStorage.getItem(localStorage.getItem('nickname')) + '</p>';
	let array = sortLocalStorage(),
		amount  = 10;

	for (let i = 0; i < array.length; i++) {
		if (amount == 0) {
			break;
		}
		if (amount > 5) {
			res_left.innerHTML += '<span>' + array[i]['key'] + ': ' + array[i]['value'] + '</span>';
		} else {
			res_right.innerHTML += '<span>' + array[i]['key'] + ': ' + array[i]['value'] + '</span>';
		}
		amount--;
	}

	res_left.className = '';
	res_right.className = '';
}