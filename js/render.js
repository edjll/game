class Render {
	constructor(image, width, height, frameStart = 0, frameCount = 0, framesX = 1, framesY = 1, speed = 1) {
		this.img = new Image();
		this.img.src = image;

		this.img.onload = () => {
			this.position = new Vector();

			this.frame = frameStart;
			this.frameStart = frameStart;
			this.frameCount = frameCount;
			this.framesX = framesX;
			this.framesY = framesY;

			this.frameWidth = width / framesX;
			this.frameHeight = height / framesY;

			this.speed = speed;

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
			if (this.frame > this.frameStart + this.frameCount) {
				this.frame = this.frameStart;
			}
		}

		let x = (this.frame % this.framesX) * this.frameWidthNow;
		 	y = Math.floor(this.frame / this.framesX) * this.frameHeightNow;

		 ctx.drawImage(this.image, x, y, this.frameWidth, this.frameHeight, this.position.x, this.position.y, this.frameWidth, this.frameHeight);
	}
}