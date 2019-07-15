class Player {
	constructor(imageIdle,   imageIdleWidth,   imageIdleHeight, 
				imageRun,    imageRunWidth,    imageRunHeight, 
				imageShot,   imageShotWidth,   imageShotHeight, 
				imageJump,   imageJumpWidth,   imageJumpHeight, 
				imageDeath,  imageDeathWidth,  imageDeathHeight,
				imageAttack, imageAttackWidth, imageAttackHeight,
				imageHurt,   imageHurtWidth,   imageHurtHeight,
				x, y, scale = 1, hp = 100, mp = 100, regenHp = 1, regenMp = 1) {

		this.scale = scale;

		this.position 	= new Vector(x, y);

		this.startY 	= this.position.y;

		this.input  	= new Input();

		this.frame 			= 1;
		this.frameIdle 		= 1;
		this.frameShot 		= 5;
		this.frameAttack 	= 11;
		this.frameJump 		= 7;
		this.frameHurt		= 13;
		this.frameDeath 	= 9;

		this.death = false;
		this.deathActive = false;

		this.arrows = undefined;

		this.render 	=  [
								new Render(imageIdle,   this.position.x, this.position.y, imageIdleWidth,   imageIdleHeight,   this.scale,   0, 11,  6, 4, 10),  // 0  left  idle
								new Render(imageIdle,   this.position.x, this.position.y, imageIdleWidth,   imageIdleHeight,   this.scale,  12, 11,  6, 4, 10),  // 1  right idle
								new Render(imageRun,    this.position.x, this.position.y, imageRunWidth,    imageRunHeight,    this.scale,   0, 15,  4, 8, 10),  // 2  left  run
								new Render(imageRun,    this.position.x, this.position.y, imageRunWidth,    imageRunHeight,    this.scale,  16, 15,  4, 8, 10),  // 3  right run
								new Render(imageShot,   this.position.x, this.position.y, imageShotWidth,   imageShotHeight,   this.scale,   0, 21, 11, 4, 10),  // 4  left  shot
								new Render(imageShot,   this.position.x, this.position.y, imageShotWidth,   imageShotHeight,   this.scale,  22, 21, 11, 4, 10),  // 5  right shot
								new Render(imageJump,   this.position.x, this.position.y, imageJumpWidth,   imageJumpHeight,   this.scale,   0,  0,  1, 2, 10),  // 6  left  jump
								new Render(imageJump,   this.position.x, this.position.y, imageJumpWidth,   imageJumpHeight,   this.scale,   1,  0,  1, 2, 10),  // 7  right jump
								new Render(imageDeath,  this.position.x, this.position.y, imageDeathWidth,  imageDeathHeight,  this.scale,   0, 15,  5, 6, 10),  // 8  left  death
								new Render(imageDeath,  this.position.x, this.position.y, imageDeathWidth,  imageDeathHeight,  this.scale,  16, 15,  5, 6, 10),  // 9  right death
								new Render(imageAttack, this.position.x, this.position.y, imageAttackWidth, imageAttackHeight, this.scale,   0,  9,  5, 4, 10),  // 10 left  attack
								new Render(imageAttack, this.position.x, this.position.y, imageAttackWidth, imageAttackHeight, this.scale,  10,  9,  5, 4, 10),  // 11 right attack
								new Render(imageHurt,   this.position.x, this.position.y, imageHurtWidth, 	imageHurtHeight, 	 this.scale,   0,  9,  5, 4, 10),  // 12 left  hurt
								new Render(imageHurt,   this.position.x, this.position.y, imageHurtWidth, 	imageHurtHeight, 	 this.scale,  10,  9,  5, 4, 10)   // 13 right hurt
							];

		this.hp = hp;
		this.mp = mp;

		this.regenHp = regenHp;
		this.regenMp = regenMp;

		this.lastTime 	= 0;
		this.time 		= 0;

		this.hurtActive = false;
		this.hurtHp 	= 10;

		this.jumpFrame = 0;

		this.deltaJump = 1;

		this.jumpActive = false;
		this.jumpCooldown = false;
		this.jumpTimeCoolDownStart = undefined;
		this.jumpTimeCoolDownEnd   = undefined;

		this.shotMp = 0;
		this.shotActive = false;
		this.shotCooldown = false;
		this.shotTimeCoolDownStart = undefined;
		this.shotTimeCoolDownEnd   = undefined;

		this.attackActive = false;
		this.attackCooldown = false;
		this.attackTimeCoolDownStart = undefined;
		this.attackTimeCoolDownEnd   = undefined;

		this.threeArrowMp = 0;
		this.threeArrowAmount = 2;
		this.threeArrowActive = false;
		this.threeArrowCooldown = false;
		this.threeArrowTimeCoolDownStart = undefined;
		this.threeArrowTimeCoolDownEnd   = undefined;

		this.gravityActive = false;

		this.score = 0;
	}

	translate(x, y) {
		this.position.x += x;
		if (this.position.x < 0) {
			this.position.x = 0;
		}
		this.position.y += y;
		this.render[this.frame].position.x = this.position.x;
		this.render[this.frame].position.y = this.position.y;
		this.render[this.frame - this.frame % 2].position.x = this.position.x - 70 * this.scale;
	}

	hurt(x, y) {
		if (	this.position.x + this.render[this.frame].frameWidth * this.scale > x
			&&  this.position.x + this.render[this.frame].frameWidth * this.scale / 4 < x 
			&&	this.position.y + this.render[this.frame].frameHeight * this.scale > y) {

			if (!this.hurtActive && this.hp > 0) {
				this.hurtAnimation();
			}
		}
	}

	hurtAnimation() {
		if (this.frame != this.frameHurt) {
			this.render[this.frame].frame = this.render[this.frame].frameStart;
			this.shotActive = false;
			this.attackActive = false;
			this.threeArrowActive = false;
			this.input.attack = false;
			this.input.shot = false;
			this.input.threeArrow = false;
			if (this.threeArrowAmount != 2) {
				this.threeArrowMp = 30;
				this.threeArrowAmount = 2;
				this.threeArrowTimeCoolDownStart = this.time;
				this.threeArrowCooldown = true;
			}
		}
		this.hurtActive = true;
		this.frame = this.frameHurt;
		this.translate(0, 0);
	}

	checkHurtAnimation() {
		if (this.render[this.frameHurt].last) {
			this.render[this.frameHurt].last  = false;
			this.hurtActive = false;
			this.hurtHp = 10;
		} else if (this.hurtActive) {
			if (this.hurtHp > 0 && this.hp > 0) {
				this.hp -= 1;
				this.hurtHp -= 1;
				if (this.hp == 0) {
					this.deathPlayer();
				}
			}
		}
	}

	regen() {
		if (this.regenHp == 0) {
			this.checkPlayerDeath();
		}
		if (this.time > this.lastTime + 1000) {
			if (this.hp < 100) {
				this.hp += this.regenHp;
			}
			if (this.mp < 100) {
				this.mp += this.regenMp;
			}
			this.lastTime = this.time;
		}
	}

	gravity() {
		this.gravityActive = false;
		if (this.position.y != this.startY) {
			this.translate(0, this.deltaJump * Math.floor(this.scale + 1));
			this.gravityActive = true;
		}
	}

	jump() {
		this.frame = this.frameJump;
		if (this.startY - this.position.y < 100 * Math.floor(this.scale + 1)) {
			this.translate(0, - 5 * this.deltaJump * Math.floor(this.scale + 1));
		}
		this.jumpFrame += 1;
	}

	shot() {
		if (this.mp >= 10) {
			if (this.render[this.frameShot].last) {
				this.render[this.frameShot].last  = false;
				this.render[this.frameShot].point = true;
				this.shotTimeCoolDownStart = this.time;
				this.shotCooldown = true;
				this.shotActive = false;
				this.shotMp = 10;
				return true;
			} else {
				this.shotActive = true;
				this.frame = this.frameShot;
				this.translate(0, 0);
				if (this.render[this.frame].controlFrame && this.render[this.frame].point) {
					if (this.frame == 5) {
						this.arrows.addArrow(this.position.x + this.render[this.frame].frameWidth * this.scale * 0.59, this.position.y + this.render[this.frame].frameHeight * this.scale * 0.48,  6 * this.scale);
					} else {
						this.arrows.addArrow(this.position.x, this.position.y + this.render[this.frame].frameHeight * this.scale * 0.48, -6 * this.scale);
					}
					this.render[this.frame].point = false;
				}
				return false;
			}
		} else {
			return true;
		}
	}

	threeArrow() {
		if (this.mp >= 30) {
			if (this.render[this.frameShot].last) {

				this.render[this.frameShot].last  = false;
				this.render[this.frameShot].point = true;
				this.threeArrowTimeCoolDownStart = this.time;
				this.threeArrowCooldown = true;
				this.threeArrowActive = false;
				this.threeArrowMp = 30;
				this.threeArrowAmount = 2;
				return true;
			} else {
				this.threeArrowActive = true;
				this.frame = this.frameShot;
				this.translate(0, 0);
				if (this.render[this.frame].controlFrame && this.render[this.frame].point) {
					if (this.frame == 5) {
						this.arrows.addArrow(this.position.x + this.render[this.frame].frameWidth * this.scale * 0.59, this.position.y + this.render[this.frame].frameHeight * this.scale * 0.48,  6 * this.scale);
					} else {
						this.arrows.addArrow(this.position.x, this.position.y + this.render[this.frame].frameHeight * this.scale * 0.48, -6 * this.scale);
					}
					if (this.threeArrowAmount > 0) {
						this.render[this.frame].frame = this.render[this.frame].frameStart + 10;
						this.render[this.frame].point = true;
						this.threeArrowAmount -= 1;
					} else {
						this.render[this.frame].point = false;
					}
				}
				return false;
			}
		} else {
			return true;
		}
	}

	attack() {
		if (this.render[this.frameAttack].last) {
			this.render[this.frameAttack].last  = false;
			this.attackTimeCoolDownStart = this.time;
			this.attackActive = false;
			this.render[this.frame].point = true;
			this.attackCooldown = true;
			return true;
		} else {
			this.frame = this.frameAttack;
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
			this.jumpTimeCoolDownEnd = this.time;
		}
		if (this.attackCooldown) {
			if (this.attackTimeCoolDownEnd > this.attackTimeCoolDownStart + 500) {
				this.attackCooldown = false;
			}
			this.attackTimeCoolDownEnd = this.time;
		}
		if (this.shotCooldown) {
			if (this.shotTimeCoolDownEnd > this.shotTimeCoolDownStart + 5000) {
				this.shotCooldown = false;
			}
			this.shotTimeCoolDownEnd = this.time;
		}
		if (this.threeArrowCooldown) {
			if (this.threeArrowTimeCoolDownEnd > this.threeArrowTimeCoolDownStart + 8000) {
				this.threeArrowCooldown = false;
			}
			this.threeArrowTimeCoolDownEnd = this.time;
		}
	}

	manaWaste() {
		if (this.shotMp > 0) {
			this.mp -= 1;
			this.shotMp -= 1;
		}
		if (this.threeArrowMp > 0) {
			this.mp -= 1;
			this.threeArrowMp -= 1;
		}
	}

	deathPlayer() {
		this.frame = this.frameDeath;
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

	timeUpload(time) {
		this.time = time;
	}

	draw(ctx, width, x) {

		this.regen();
		this.gravity();
		this.cooldowns();
		this.manaWaste();
		this.checkHurtAnimation();

		this.arrows.translate(x, width);
		this.arrows.draw(ctx);

		this.render[this.frame].draw(ctx);

	}
}