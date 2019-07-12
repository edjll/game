class Bot {
	constructor(x, y) {
		this.position = new Vector(x, y);
		this.frame = 1;
		this.frame_attack = 8;
		this.step = 2;

		this.scale = scale;

		this.delta = undefined;

		this.cooldown = false;
		this.timeCooldownStart = undefined;
		this.timeCooldownEnd = undefined;
	}

	attack() {
		if (!this.cooldown) {
			this.frame = 8;
		} else {
			this.timeCooldownEnd = performance.now()
			this.frame = 0;
			this.cooldownReset();
		}
	}

	cooldownReset() {
		if (this.timeCooldownEnd > this.timeCooldownStart + 2000) {
			this.cooldown = false;
		}
	}

	translate(x, y, width, height, scale) {
		this.delta = Math.floor((x + width * scale * 0.4 - this.position.x) / this.step);
		if (this.delta) {
			if (this.delta > 0) {
				this.frame = 3;
				this.position.x += this.step;
			} else if (this.delta < 0){
				this.frame = 2;
				this.position.x -= this.step;
			}
		}
		if (this.position.x < 0) {
			this.position.x = 0;
		}
		this.position.y += y - this.position.y;
		if (this.position.x < x + width * this.scale * 0.4 && this.position.x > x) {
			this.attack();
		}
	}
}