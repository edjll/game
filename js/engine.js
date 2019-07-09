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

		window.requestAnimationFrame(this.loop.bind(this));
	}

	addGround(object, index) {
		this.ground[index] = object;
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
			this.ground.forEach(element => {
				element.draw(this.ctx);
			});
		}

		this.ctx.restore();

		this.lastTime = realTime;
		window.requestAnimationFrame(this.loop.bind(this));
	}
}