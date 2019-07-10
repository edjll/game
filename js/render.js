class Render {
	constructor(image, x, y, width, height, scale = 1, frameStart = 0, frameCount = 0, framesX = 1, framesY = 1, speed = 1) {
		this.image = new Image();
		this.image.src = image;

		this.position = new Vector(x, y);

		this.image.onload = () => {

			this.frame = frameStart;
			this.frameStart = frameStart;
			this.frameCount = frameCount;
			this.framesX = framesX;
			this.framesY = framesY;

			this.scale = scale;

			this.frameWidth = width / framesX;
			this.frameHeight = height / framesY;

			this.speed = speed;

			this.last = false;

			this.controlFrame = false;
			this.point = true;

			this.time = performance.now();

			this.image.ready = true;
		}
	}

	draw(ctx) {
		if (this.image.ready) {
			let time = performance.now();
			if (time > this.time) {
				this.frame++;
				this.time = time + 1000 / this.speed;
			}
			if (this.frame == this.frameStart + this.frameCount - 2) {
				this.controlFrame = true;
			} else {
				this.controlFrame = false;
			}
			if (this.frame > this.frameStart + this.frameCount) {
				this.frame = this.frameStart;
				this.last = true;
			}

			let x = (this.frame % this.framesX) * this.frameWidth,
			 	y = Math.floor(this.frame / this.framesX) * this.frameHeight;

			ctx.drawImage(this.image, x, y, this.frameWidth, this.frameHeight, this.position.x, this.position.y, this.frameWidth * this.scale, this.frameHeight * this.scale);
		}
	}
}