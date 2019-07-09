class Engine {
	constructor() {
		this.canvas 		= document.createElement('canvas');
		this.canvas.width 	= window.innerWidth - 40;
		this.canvas.height 	= window.innerHeight - 40;
		document.body.appendChild(this.canvas);

		this.ctx 			= this.canvas.getContext('2d');

		this.lastTime 		= performance.now();

		this.objects 		= [];

		this.camera 		= new Vector(0, 0);

		this.input 			= new Input();

		this.ground 		= [];

		this.player 		= undefined;

		window.requestAnimationFrame(this.loop.bind(this));
	}

	addGround(object) {
		this.ground.push(object);
	}

	addObject(object) {
		this.objects.push(object);
	}

	getLocalPosition(object) {
		return object.position.plus(this.camera);
	}

	loop() {
		let realTime  = performance.now(),
			dt 		  = (realTime - this.lastTime) / 1000;

		if (this.update) {
			this.update(dt);
		}

		this.ctx.save();

		if (this.ground) {
			this.ctx.translate(this.camera.x, this.camera.y);
			this.ground.forEach(element => {
				element.draw(this.ctx);
			});
		}

		this.objects.forEach(object => {
			object.draw(this.ctx);
		});

		this.player.draw(this.ctx);

		this.ctx.restore();

		this.lastTime = realTime;
		window.requestAnimationFrame(this.loop.bind(this));
	}
}