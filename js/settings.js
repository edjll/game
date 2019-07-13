let 
	helpPanel   = document.getElementById('helpPanel'),
	loginForm 	= document.getElementById('login'),
	start 		= document.getElementById('start'),
	nickname 	= document.getElementById('nickname');
	end			= document.getElementById('end')


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

if (!this.game) {
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

}
