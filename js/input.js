class Input {
	constructor() {
		this.downKeys 	= [];
		this.speed 		= 1;
		this.pause 		= true;

		document.onkeydown = (event) => {
			this.downKeys[event.code] = true;
			if (event.code == 'Escape') {
				this.pause = !this.pause;
			}
		}

		document.onkeyup = (event) => {
			this.downKeys[event.code] = false;
		}
	}

	isKeyDown(keyCode) {
		return this.downKeys[keyCode];
	}
}