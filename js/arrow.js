class Arrow {
	constructor(x, y, speed) {
		this.position = new Vector(x, y);
		this.speed = speed;
	}

	translate(x, width, arrows) {
		if (this.position.x > x + width) {
			if (arrows.indexOf(this) != -1) {
				arrows.splice(arrows.indexOf(this));
			}
		} else {
			this.position.x += this.speed;
		}
	}
}