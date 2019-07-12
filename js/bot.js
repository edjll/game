class Bot {
	constructor(image_idle,   image_idle_width,   image_idle_height, 
				image_run,    image_run_width,    image_run_height,
				image_hurt,   image_hurt_width,	  image_hurt_height,
				image_death,  image_death_width,  image_death_height,
				image_attack, image_attack_width, image_attack_height,
				x, y, scale) {
		this.position = new Vector(x, y);
		this.frame = 1;
		this.frame_attack = 8;
		this.step = 2;

		this.scale = scale;

		this.delta = undefined;

		this.render = [
							new Render(image_idle,   this.position.x, this.position.y, image_idle_width,   image_idle_height,   this.scale,   0, 11,  4, 6, 10),  // 0  left  idle
							new Render(image_idle,   this.position.x, this.position.y, image_idle_width,   image_idle_height,   this.scale,  12, 11,  4, 6, 10),  // 1  right idle
							new Render(image_run,    this.position.x, this.position.y, image_run_width,    image_run_height,    this.scale,   0, 15,  4, 8, 10),  // 2  left  run
							new Render(image_run,    this.position.x, this.position.y, image_run_width,    image_run_height,    this.scale,  16, 15,  4, 8, 10),  // 3  right run
							new Render(image_hurt,   this.position.x, this.position.y, image_hurt_width,   image_hurt_height,   this.scale,   0, 15,  4, 8, 10),  // 4  left  hurt
							new Render(image_hurt,   this.position.x, this.position.y, image_hurt_width,   image_hurt_height,   this.scale,  16, 15,  4, 8, 10),  // 5  right hurt
							new Render(image_death,  this.position.x, this.position.y, image_death_width,  image_death_height,  this.scale,   0, 15,  5, 6, 10),  // 6  left  death
							new Render(image_death,  this.position.x, this.position.y, image_death_width,  image_death_height,  this.scale,  16, 15,  5, 6, 10),  // 7  right death
							new Render(image_attack, this.position.x, this.position.y, image_attack_width, image_attack_height, this.scale,   0, 11,  4, 6, 10),  // 8 left  attack
							new Render(image_attack, this.position.x, this.position.y, image_attack_width, image_attack_height, this.scale,  12, 11,  4, 6, 10)   // 9 right attack
						];

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

	draw(ctx) {
		this.render[this.frame].draw(ctx);
	}
}