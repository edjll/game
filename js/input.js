class Input {
	constructor() {
		this.downKeys 	= [];
		this.speed 		= 1;
		this.pause 		= true;
		this.shot 		= false;

		document.onkeydown = (event) => {
			this.downKeys[event.code] = true;
			if (event.code == 'Escape') {
				this.pause = !this.pause;
			}
			if (event.code == 'ControlLeft') {
				this.shot = true;
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