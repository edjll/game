class Avatar {
	constructor(image, x, y, radius, scale) {
		this.image = new Image();
		this.image.src = image;

		this.position = new Vector(x, y);

		this.radius = radius;

		this.scale = scale;

		this.image.onload = () => {
			this.image.ready = true;
		}
	}

	draw(ctx, x) {
		if (this.image.ready) {

			ctx.strokeStyle = '#214a2e';
			ctx.lineWidth = 5 * this.scale;

			ctx.beginPath();

				ctx.arc(x + this.position.x * this.scale, this.position.y * this.scale, this.radius * this.scale, 0, Math.PI * 2);

			ctx.closePath();
			ctx.stroke();

			let hp = ctx.createLinearGradient(x + (this.position.x + this.radius + 10) * this.scale, this.position.y * this.scale,
											  x + (this.position.x + this.radius + 10) * this.scale, (this.position.y + 20) * this.scale);

			hp.addColorStop(0, "#d8263f");
			hp.addColorStop(1, "#ab1d31");

			ctx.fillStyle = hp;

			ctx.beginPath();

				ctx.fillRect(x + (this.position.x + this.radius + 10) * this.scale, this.position.y * this.scale, 150 * this.scale, 20 * this.scale);
			
			ctx.closePath();
			ctx.stroke();


			ctx.drawImage(this.image, x + this.position.x - this.radius * 0.9, this.position.y - this.radius * 0.9, this.image.width * this.scale, this.image.height * this.scale);
		}
	}
}