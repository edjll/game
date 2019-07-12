class Arrow {
	constructor(x, y, speed, width, height) {
		this.position = new Vector(x, y);
		this.speed = speed;
		this.width = width;
		this.height = height;
	}

	removeArrow(arrows) {
		if (arrows.indexOf(this) != -1) {
			arrows.splice(arrows.indexOf(this));
		}
	}

	translate(x, width, arrows) {
		if (this.position.x > x + width || this.position.x + this.width < x) {
			if (arrows.indexOf(this) != -1) {
				arrows.splice(arrows.indexOf(this));
			}
		} else {
			this.position.x += this.speed;
		}
	}
}