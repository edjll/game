class Player {
	constructor(image_idle,   image_idle_width,   image_idle_height, 
				image_run,    image_run_width,    image_run_height, 
				image_shot,   image_shot_width,   image_shot_height, 
				image_jump,   image_jump_width,   image_jump_height, 
				image_death,  image_death_width,  image_death_height,
				image_attack, image_attack_width, image_attack_height,
				image_hurt,   image_hurt_width,   image_hurt_height,
				x, y, scale = 1, hp = 100, mp = 100, regenHp = 1, regenMp = 1) {

		this.image_idle = image_idle;
		this.image_run 	= image_run;
		this.image_shot = image_shot;
		this.image_jump = image_jump;
		this.image_death = image_death;
		this.image_attack = image_attack;
		this.image_hurt = image_hurt;

		this.scale = scale;

		this.position 	= new Vector(x, y);

		this.startY 	= this.position.y;

		this.frame 		= 1;
		this.frame_idle = 1;
		this.frame_shot = 5;
		this.frame_attack = 11;
		this.frame_jump = 7;
		this.frame_hurt = 13;

		this.death 	= false;
		this.deathActive = false;

		this.arrows = undefined;

		this.render 	=  [
								new Render(this.image_idle,   this.position.x, this.position.y, image_idle_width,   image_idle_height,   this.scale,   0, 11,  6, 4, 10),  // 0  left  idle
								new Render(this.image_idle,   this.position.x, this.position.y, image_idle_width,   image_idle_height,   this.scale,  12, 11,  6, 4, 10),  // 1  right idle
								new Render(this.image_run,    this.position.x, this.position.y, image_run_width,    image_run_height,    this.scale,   0, 15,  4, 8, 10),  // 2  left  run
								new Render(this.image_run,    this.position.x, this.position.y, image_run_width,    image_run_height,    this.scale,  16, 15,  4, 8, 10),  // 3  right run
								new Render(this.image_shot,   this.position.x, this.position.y, image_shot_width,   image_shot_height,   this.scale,   0, 21, 11, 4, 10),  // 4  left  shot
								new Render(this.image_shot,   this.position.x, this.position.y, image_shot_width,   image_shot_height,   this.scale,  22, 21, 11, 4, 10),  // 5  right shot
								new Render(this.image_jump,   this.position.x, this.position.y, image_jump_width,   image_jump_height,   this.scale,   0,  0,  1, 2, 10),  // 6  left  jump
								new Render(this.image_jump,   this.position.x, this.position.y, image_jump_width,   image_jump_height,   this.scale,   1,  0,  1, 2, 10),  // 7  right jump
								new Render(this.image_death,  this.position.x, this.position.y, image_death_width,  image_death_height,  this.scale,   0, 15,  5, 6, 10),  // 8  left  death
								new Render(this.image_death,  this.position.x, this.position.y, image_death_width,  image_death_height,  this.scale,  16, 15,  5, 6, 10),  // 9  right death
								new Render(this.image_attack, this.position.x, this.position.y, image_attack_width, image_attack_height, this.scale,   0,  9,  5, 4, 10),  // 10 left  attack
								new Render(this.image_attack, this.position.x, this.position.y, image_attack_width, image_attack_height, this.scale,  10,  9,  5, 4, 10),  // 11 right attack
								new Render(this.image_hurt,   this.position.x, this.position.y, image_hurt_width, 	image_hurt_height, 	 this.scale,   0,  9,  5, 4, 10),  // 12 left  hurt
								new Render(this.image_hurt,   this.position.x, this.position.y, image_hurt_width, 	image_hurt_height, 	 this.scale,  10,  9,  5, 4, 10)   // 13 right hurt
							];

		this.hp = hp;
		this.mp = mp;

		this.regenHp = regenHp;
		this.regenMp = regenMp;

		this.lastTime = performance.now();
		this.realTime = performance.now();

		this.hurtActive = false;

		this.jumpFrame = 0;

		this.deltaJump = 1;

		this.jumpActive = false;
		this.jumpCooldown = false;
		this.jumpTimeCoolDownStart = undefined;
		this.jumpTimeCoolDownEnd   = undefined;

		this.shotMp = 20;
		this.shotActive = false;
		this.shotCooldown = false;
		this.shotTimeCoolDownStart = undefined;
		this.shotTimeCoolDownEnd   = undefined;

		this.attackActive = false;

		this.gravityActive = false;
	}

	translate(x, y) {
		this.position.x += x;
		if (this.position.x < 0) {
			this.position.x = 0;
		}
		this.position.y += y;
		this.render[this.frame].position.x = this.position.x;
		this.render[this.frame].position.y = this.position.y;
		this.render[10].position.x = this.position.x - 70 * this.scale;
		this.render[10].position.y = this.position.y;
	}

	hurt(x, y) {
		if (this.position.x + this.render[this.frame].frameWidth > x && this.position.x < x) {
			this.hurtAnimation();
			this.hp -= 1;
			if (this.hp < 0) {
				this.hp = 0;
				this.deathPlayer();
			}
		}
	}

	hurtAnimation() {
		this.hurtActive = true;
		this.frame = 13;
		this.translate(0, 0);
	}

	checkHurtAnimation() {
		if (this.render[this.frame_hurt].last) {
			this.render[this.frame_hurt].last  = false;
			this.hurtActive = false;
		}
	}

	regen() {
		if (this.regenHp == 0) {
			this.checkPlayerDeath();
		}
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
		this.gravityActive = false;
		if (this.position.y != this.startY) {
			this.translate(0, this.deltaJump);
			this.gravityActive = true;
		}
	}

	jump() {
		this.frame = this.frame_jump;
		if (this.startY - this.position.y < 100) {
			this.translate(0, - 5 * this.deltaJump);
		}
		this.jumpFrame += 1;
	}

	shot() {
		if (this.mp >= this.shotMp) {
			if (this.render[this.frame_shot].last) {
				this.render[this.frame_shot].last  = false;
				this.render[this.frame_shot].point = true;
				this.shotTimeCoolDownStart = performance.now();
				this.shotCooldown = true;
				this.shotActive = false;
				this.shotMp = 20;
				return true;
			} else {
				this.shotActive = true;
				this.frame = this.frame_shot;
				this.translate(0, 0);
				if (this.shotMp > 0) {
					this.mp -= 1;
					this.shotMp -= 1;
				}
				if (this.render[this.frame].controlFrame && this.render[this.frame].point) {
					if (this.frame == 5) {
						this.arrows.addArrow(this.position.x + this.render[this.frame].frameWidth * this.scale * 0.59, this.position.y + this.render[this.frame].frameHeight * this.scale * 0.48,  6);
					} else {
						this.arrows.addArrow(this.position.x, this.position.y + this.render[this.frame].frameHeight * this.scale * 0.48, -6);
					}
					this.render[this.frame].point = false;
				}
				return false;
			}
		}
	}

	attack() {
		if (this.render[this.frame_attack].last) {
			this.render[this.frame_attack].last  = false;
			this.attackTimeCoolDownStart = performance.now();
			this.attackActive = false;
			this.attackMp = 10;
			return true;
		} else {
			this.frame = this.frame_attack;
			this.attackActive = true;
			this.translate(0, 0);
			return false;
		}
	}

	cooldowns() {
		if (this.jumpCooldown) {
			if (this.jumpTimeCoolDownEnd > this.jumpTimeCoolDownStart + 3000) {
				this.jumpCooldown = false;
			}
			this.jumpTimeCoolDownEnd = performance.now();
		}
		if (this.shotCooldown) {
			if (this.shotTimeCoolDownEnd > this.shotTimeCoolDownStart + 5000) {
				this.shotCooldown = false;
			}
			this.shotTimeCoolDownEnd = performance.now();
		}
	}

	deathPlayer() {
		this.frame = 9;
		this.translate(0, 0);
		this.regenHp = 0;
		this.regenMp = 0;
		this.deathActive = true;
	}

	checkPlayerDeath() {
		if (this.render[this.frame].controlFrame) {
			this.death = true;
		}
	}

	draw(ctx, width, x) {

		this.regen();
		this.gravity();
		this.cooldowns();

		this.checkHurtAnimation();

		this.arrows.translate(x, width);
		this.arrows.draw(ctx);

		this.render[this.frame].draw(ctx);

	}
}