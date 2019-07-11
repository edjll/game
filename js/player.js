class Player {
	constructor(image_idle, image_idle_width, image_idle_height, image_run, image_run_width, image_run_height, image_shot, image_shot_width, image_shot_height, image_jump, image_jump_width, image_jump_height, x, y, scale = 1, hp = 100, mp = 100, regenHp = 1, regenMp = 1) {
		this.image_idle = image_idle;
		this.image_run 	= image_run;
		this.image_shot = image_shot;
		this.image_jump = image_jump;

		this.position 	= new Vector(x, y);

		this.startY 	= this.position.y;

		this.frame 		= 1;
		this.frame_idle = 1;
		this.frame_shot = 5;

		this.render 	=  [
								new Render(this.image_idle, this.position.x, this.position.y, image_idle_width, image_idle_height, scale,   0, 11,  6, 4, 10),  //left  idle
								new Render(this.image_idle, this.position.x, this.position.y, image_idle_width, image_idle_height, scale,  12, 11,  6, 4, 10),  //right idle
								new Render(this.image_run,  this.position.x, this.position.y, image_run_width,  image_run_height,  scale,   0, 15,  4, 4, 10),  //left  run
								new Render(this.image_run,  this.position.x, this.position.y, image_run_width,  image_run_height,  scale,   0, 15,  4, 4, 10),  //right run
								new Render(this.image_shot, this.position.x, this.position.y, image_shot_width, image_shot_height, scale,   0, 21, 11, 4, 10),  //left  shot
								new Render(this.image_shot, this.position.x, this.position.y, image_shot_width, image_shot_height, scale,  22, 21, 11, 4, 10),  //right shot
								new Render(this.image_jump, this.position.x, this.position.y, image_jump_width, image_jump_height, scale,   0,  0,  1, 1, 10)   //right jump
							];

		this.hp = hp;
		this.mp = mp;

		this.regenHp = regenHp;
		this.regenMp = regenMp;

		this.lastTime = performance.now();
		this.realTime = performance.now();

		this.jumpFrame = 0;

		this.deltaJump = 1;

		this.jumpCooldown = false;
		this.jumpTimeCoolDownStart = undefined;
		this.jumpTimeCoolDownEnd = undefined;
	}

	translate(x, y) {
		this.position.x += x;
		if (this.position.x < 0) {
			this.position.x = 0;
		}
		this.position.y += y;
		this.render[this.frame].position.x = this.position.x;
		this.render[this.frame].position.y = this.position.y;
	}

	hurt(x, y) {
		if (this.position.x + this.render[this.frame].frameWidth > x && this.position.x < x) {
			this.hp -= 2;
			if (this.hp < 0) {
				this.hp = 0;
			}
		}
	}

	regen() {
		if (this.realTime > this.lastTime + 1000) {
			if (this.hp < 100) {
				this.hp += this.regenHp;
			}
			if (this.mp < 100) {
				this.mp += this.regenMp;
			}
			this.lastTime = this.realTime;
		}
		this.realTime = performance.now();
	}

	gravity() {
		if (this.position.y != this.startY) {
			this.translate(0, this.deltaJump);
		}
	}

	jump() {
		if (this.startY - this.position.y < 100) {
			this.translate(0, - 5 * this.deltaJump);
		}
		this.jumpFrame += 1;
	}

	cooldowns() {
		if (this.jumpCooldown) {
			if (this.jumpTimeCoolDownEnd > this.jumpTimeCoolDownStart + 3000) {
				this.jumpCooldown = false;
			}
			this.jumpTimeCoolDownEnd = performance.now();
		}
	}

	draw(ctx) {
		this.regen();
		this.gravity();
		this.cooldowns();
		this.render[this.frame].draw(ctx);

	}
}