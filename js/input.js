class Input {
	constructor() {
		this.downKeys 	= [];
		this.speed 		= 1;

		document.onkeydown = (event) => {
			this.downKeys[event.code] = true;
		}

		document.onkeyup = (event) => {
			this.downKeys[event.code] = false;
		}
	}

	isKeyDown(keyCode) {
		return this.downKeys[keyCode];
	}
}