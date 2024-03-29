class Render {
	constructor(image, x, y, width, height, scale = 1, frameStart = 0, frameCount = 0, framesX = 1, framesY = 1, speed = 1) {

		this.position = new Vector(x, y);

		this.frame 			= frameStart;
		this.frameStart 	= frameStart;
		this.frameCount 	= frameCount;
		this.framesX 		= framesX;
		this.framesY 		= framesY;

		this.scale 			= scale;

		this.frameWidth  	= width / framesX;
		this.frameHeight 	= height / framesY;

		this.speed 			= speed;

		this.last  			= false;

		this.death 			= false;

		this.controlFrame 	= false;
		this.point 		  	= true;

		if (typeof image == 'string') {
			this.image = new Image();

			this.image.onload = () => {

				this.time 			= performance.now();
				this.image.ready 	= true;
			}

			this.image.src = image;
		} else {
			this.image = image;

			if (this.image.complete) {

				this.time 			= performance.now();
				this.image.ready 	= true;				
			}
		}
	}

	draw(ctx) {
		if (this.image.ready) {
			let time = performance.now();
			if (time > this.time) {
				this.frame += 1;
				this.time = time + 1000 / this.speed;
			}
			if (this.frame == this.frameStart + this.frameCount - 2) {
				this.controlFrame = true;
			} else {
				this.controlFrame = false;
			}
			if (this.frame > this.frameStart + this.frameCount) {
				this.frame 	= this.frameStart;
				this.last 	= true;
			}

			let x = (this.frame % this.framesX) * this.frameWidth,
			 	y = Math.floor(this.frame / this.framesX) * this.frameHeight;

			ctx.drawImage(this.image, x, y, this.frameWidth, this.frameHeight, this.position.x, this.position.y, this.frameWidth * this.scale, this.frameHeight * this.scale);
		}
	}
}