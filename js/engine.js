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

		window.requestAnimationFrame(this.loop());
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

		if (this.map) {
			this.ctx.translate(this.map.camera.x, this.map.camera.y);
			this.map.draw(this.ctx);
		}

		this.lastTime = realTime;
		window.requestAnimationFrame(this.loop.bind(this));
	}
}