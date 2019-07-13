class Engine {
	constructor() {
		this.canvas 		= document.createElement('canvas');
		this.canvas.width 	= window.innerWidth;
		this.canvas.height 	= window.innerHeight;
		document.body.appendChild(this.canvas);

		this.ctx 			= this.canvas.getContext('2d');

		this.lastTime 		= performance.now();

		this.bots			= undefined;

		this.camera 		= new Vector(0, 0);

		this.input 			= new Input();

		this.ground 		= [];

		this.player 		= undefined;

		this.avatar 		= undefined;

		this.skills 		= undefined;

		this.game 			= true;

		this.gamePause 		= false;

		window.requestAnimationFrame(this.loop.bind(this));
	}

	addGround(object) {
		this.ground.push(object);
	}

	getLocalPosition(object) {
		return object.position.plus(this.camera);
	}

	pause() {
		this.ctx.fillStyle = '#00000099';

		this.ctx.fillRect(0, 0, -this.camera.x + this.canvas.width, -this.camera.y + this.canvas.height);

		this.ctx.fillStyle = 'white';
		this.font = 40 * this.player.scale + 'px Georgia';
		this.ctx.textAlign = 'center';
		this.ctx.fillText('Pause', -this.camera.x + this.canvas.width / 2, -this.camera.y + this.canvas.height / 2);
	}

	loop() {
		let realTime  = performance.now();
		

		if (!this.gamePause && this.game) {

			if (realTime > this.lastTime + 5000) {
				this.bots.addBot(-this.camera.x + this.canvas.width);
				this.lastTime = realTime;
			}

			if (this.update && !this.player.deathActive) {
				this.update();
			}

			this.ctx.save();

			if (this.ground) {
				this.ctx.translate(this.camera.x, this.camera.y);
				this.ground.forEach(element => {
					element.draw(this.ctx);
				});
			}

			if ((this.player.frame == this.player.frame_attack) && this.player.render[this.player.frame].controlFrame && this.player.render[this.player.frame].point) {
				if (this.bots.hurt(this.player.render[this.player.frame].position.x, 10, this.player.render[this.player.frame].frameWidth, this.player)) {
					this.player.render[this.player.frame].point = false; 
				}
			}


			this.player.arrows.arrows.forEach(arrow => {
				if (this.bots.hurt(arrow.position.x, 30, arrow.width)) {
					arrow.removeArrow(this.player.arrows.arrows);
					this.player.score += 100;
				}
			});

			this.bots.bot.forEach(bot => {
				if (bot.frame == bot.frame_attack) {
					if (bot.frame_attack % 2 == 1 && bot.render[bot.frame].controlFrame && bot.render[bot.frame].point) {
						this.player.hurt(bot.position.x + bot.render[bot.frame].frameWidth * bot.scale, bot.position.y);
					} else if (bot.frame_attack % 2 == 0 && bot.render[bot.frame].controlFrame && bot.render[bot.frame].point) {
						this.player.hurt(bot.position.x, bot.position.y);
					}
				}
			});

			this.bots.draw(this.ctx, this.player.position.x, this.player.position.y, this.player.render[this.player.frame].frameWidth, this.player.render[this.player.frame].frameHeight);

			this.player.draw(this.ctx, this.canvas.width, -this.camera.x);

			this.avatar.draw(this.ctx, -this.camera.x, this.canvas.width, this.player.hp, this.player.mp, this.player.score);

			this.skills.draw(this.ctx, -this.camera.x, this.canvas.width, this.canvas.height, this.player.shotTimeCoolDownStart, this.player.shotCooldown, this.player.attackTimeCoolDownStart, this.player.attackCooldown, this.player.jumpTimeCoolDownStart, this.player.jumpCooldown);

			if (this.player.death) {
				this.game = false;
			} else if (!this.input.pause) {
				this.gamePause = true;
				this.pause();
			}

			this.ctx.restore();

		}
		if (this.input.pause) {
			this.gamePause = false;
		}

		window.requestAnimationFrame(this.loop.bind(this));
	}
}