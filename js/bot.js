class Bot {
	constructor(image_idle,   image_idle_width,   image_idle_height, 
				image_run,    image_run_width,    image_run_height,
				image_hurt,   image_hurt_width,	  image_hurt_height,
				image_death,  image_death_width,  image_death_height,
				image_attack, image_attack_width, image_attack_height,
				x, y, scale) {
		this.position = new Vector(x, y);
		this.frame = 1;
		this.frame_attack = 9;
		this.frame_idle = 1;
		this.step = 2;

		this.scale = scale;

		this.render = [
							new Render(image_idle,   this.position.x, this.position.y, image_idle_width,   image_idle_height,   this.scale,   0, 11,  4, 6, 10),  // 0  left  idle
							new Render(image_idle,   this.position.x, this.position.y, image_idle_width,   image_idle_height,   this.scale,  12, 11,  4, 6, 10),  // 1  right idle
							new Render(image_run,    this.position.x, this.position.y, image_run_width,    image_run_height,    this.scale,   0, 15,  4, 8, 10),  // 2  left  run
							new Render(image_run,    this.position.x, this.position.y, image_run_width,    image_run_height,    this.scale,  16, 15,  4, 8, 10),  // 3  right run
							new Render(image_hurt,   this.position.x, this.position.y, image_hurt_width,   image_hurt_height,   this.scale,   0, 15,  4, 8, 10),  // 4  left  hurt
							new Render(image_hurt,   this.position.x, this.position.y, image_hurt_width,   image_hurt_height,   this.scale,  16, 15,  4, 8, 10),  // 5  right hurt
							new Render(image_death,  this.position.x, this.position.y, image_death_width,  image_death_height,  this.scale,   0, 11,  4, 6, 10),  // 6  left  death
							new Render(image_death,  this.position.x, this.position.y, image_death_width,  image_death_height,  this.scale,  12, 11,  4, 6, 10),  // 7  right death
							new Render(image_attack, this.position.x, this.position.y, image_attack_width, image_attack_height, this.scale,   0, 11,  4, 6, 10),  // 8 left  attack
							new Render(image_attack, this.position.x, this.position.y, image_attack_width, image_attack_height, this.scale,  12, 11,  4, 6, 10)   // 9 right attack
						];

		this.cooldown = false;
		this.timeCooldownStart = undefined;
		this.timeCooldownEnd = undefined;

		this.attackActive = false;

		this.hp = 30;

		this.deathActive = false;
	}

	attack() {
		if (!this.cooldown) {
			if (this.render[this.frame_attack].last) {
				this.render[this.frame_attack].last = false;
				this.cooldown = true;
				this.attackActive = false;
				this.timeCooldownStart = performance.now();
			} else {
				this.attackActive = true;
				this.frame = this.frame_attack;
			}
		} else {
			this.timeCooldownEnd = performance.now()
			this.frame = this.frame_idle;
			this.cooldownReset();
		}
	}

	cooldownReset() {
		if (this.timeCooldownEnd > this.timeCooldownStart + 2000) {
			this.cooldown = false;
		}
	}

	hurt(x, hp, width) {
		if (x + width * this.scale > this.render[this.frame].position.x + this.render[this.frame - this.frame % 2].frameWidth * this.scale * 0.6 && x < this.render[this.frame].position.x + this.render[this.frame - this.frame % 2].frameWidth * this.scale * 0.4) {
			this.hp -= hp;
			return true;
		} else {
			return false;
		}
	}

	death(bots) {
		if (this.hp == 0) {
			if (this.render[7].controlFrame) {
				if (bots.indexOf(this) != -1) {
					bots.splice(bots.indexOf(this), 1);
				}
			} else {
				this.deathActive = true;
				this.frame = 7;
				this.render[this.frame].position.x = this.position.x;
				this.render[this.frame - this.frame % 2].position.x = this.position.x - this.render[this.frame - this.frame % 2].frameWidth * this.scale * 0.6;
			}
		}
	}

	translate(x, width, height) {
		this.deltaRight = Math.floor((this.position.x + 10 - (x + width * this.scale * 0.5)) / this.step);
		this.deltaLeft = Math.floor((x + 10 - (this.position.x + this.render[this.frame].frameWidth * this.scale * 0.5)) / this.step);
		if ((this.position.x <= x && this.position.x + this.render[this.frame].frameWidth * this.scale * 0.5 >= x) || (
			 this.position.x >= x && this.position.x <= x + width * this.scale * 0.5) || this.attackActive) {
			this.attack();
		} else {
			if (this.deltaLeft > 0) {
				this.frame = 3;
				this.frame_attack = 9;
				this.frame_idle = 1;
				this.position.x += this.step;
			} else if (this.deltaRight > 0) {
				this.frame_idle = 0;
				this.frame_attack = 8;
				this.frame = 2;
				this.position.x -= this.step;
			} else {
				this.frame = 1;
			}
			if (this.position.x < 0) {
				this.position.x = 0;
			}
		}
		this.render[this.frame].position.x = this.position.x;
		this.render[this.frame - this.frame % 2].position.x = this.position.x - this.render[this.frame].frameWidth * this.scale * 0.6;
	}

	draw(ctx, x, y, width, height, bots) {
		this.death(bots);
		if (!this.deathActive) {
			this.translate(x, y, width, height);
		}
		this.render[this.frame].draw(ctx);

		ctx.fillStyle = 'red';

		ctx.fillRect(this.render[this.frame].position.x + this.render[this.frame].frameWidth * this.scale * 0.5 * Math.abs(~this.frame % 2) + 20 * this.scale, this.render[this.frame].position.y + 15 * this.scale, this.hp * 1.8 * this.scale,  8 * this.scale);

		ctx.fillStyle = 'black';

		ctx.fillRect(this.render[this.frame].position.x + this.render[this.frame].frameWidth * this.scale * 0.5 * Math.abs(~this.frame % 2) + 20 * this.scale + this.hp * 1.8 * this.scale, this.render[this.frame].position.y + 15 * this.scale, (30 - this.hp) * 1.8 * this.scale,  8 * this.scale);
	}
}