class Input {
	constructor() {
		this.downKeys 	= [];
		this.speed 		= 1;
		this.pause 		= true;
		this.shot 		= false;
		this.jump 		= false;
		this.attack 	= false;

		document.onkeydown = (event) => {
			this.downKeys[event.code] = true;
			if (event.code == 'Escape') {
				this.pause = !this.pause;
			}
			if (event.code == 'ControlLeft') {
				this.shot = true;
			}
			if (event.code == 'ArrowUp') {
				this.jump = true;
			}
			if (event.code == 'Space') {
				this.attack = true;
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