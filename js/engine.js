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
		this.ctx.globalAlpha = 0.5;

		this.ctx.fillStyle = 'black';

		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.ctx.globalAlpha = 1;
	}

	loop() {
		let realTime  = performance.now(),
			dt 		  = (realTime - this.lastTime) / 1000;

		if (!this.gamePause && this.game) {
			if (this.update) {
				this.update();
			}

			this.ctx.save();

			if (this.ground) {
				this.ctx.translate(this.camera.x, this.camera.y);
				this.ground.forEach(element => {
					element.draw(this.ctx);
				});
			}
			
			this.bots.draw(this.ctx);

			this.player.draw(this.ctx, this.canvas.width, -this.camera.x);

			this.avatar.draw(this.ctx, -this.camera.x, this.player.hp, this.player.mp);

			if (this.player.death) {
				this.game = false; 
				this.pause();
			} else if (!this.input.pause) {
				this.gamePause = true;
				this.pause();
			}

			this.ctx.restore();

		}
		if (this.input.pause) {
			this.gamePause = false;
		}

		this.lastTime = realTime;
		window.requestAnimationFrame(this.loop.bind(this));
	}
}